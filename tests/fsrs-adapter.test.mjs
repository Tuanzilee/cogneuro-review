import test from 'node:test';
import assert from 'node:assert/strict';
import { createReviewEngine, STATE_KEY, LEGACY_BACKUP_KEY } from '../src/fsrs-adapter.mjs';
function memory(initial={}) { const map=new Map(Object.entries(initial));return {getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)}; }
const now=new Date('2026-10-31T01:15:00Z');
test('legacy due dates and weakness survive without fabricated history',async()=>{
 const old={C1:{box:4,due:+now+864e5,weak:true}};const storage=memory({cn_srs:JSON.stringify(old)});const e=await createReviewEngine({storage,legacy:old,now:()=>now});
 assert.equal(e.isNew('C1'),false);assert.equal(e.isDue('C1'),false);assert.deepEqual(e.summary(),old);assert.equal(e.exportState().fsrs.history.length,0);assert.equal(storage.getItem(STATE_KEY),null);
 e.review('C1',3);assert.deepEqual(JSON.parse(storage.getItem(LEGACY_BACKUP_KEY)),old);assert.equal(storage.getItem('cn_srs'),JSON.stringify(old));assert.equal(e.exportState().fsrs.history.length,1);
});
test('all ratings produce ordered due times and Again is not immediately due',async()=>{
 const e=await createReviewEngine({storage:memory(),now:()=>now});const options=e.preview('C1');assert.equal(options.length,4);
 for(let i=1;i<options.length;i++)assert.ok(+options[i].dueAt>+options[i-1].dueAt);
 const r=e.review('C1',1);assert.ok(+r.card.dueAt>+now);assert.equal(e.isDue('C1'),false);assert.equal(e.summary().C1.weak,true);
});
test('reload hydrates saved dates and continues the same review history',async()=>{
 const storage=memory();const e=await createReviewEngine({storage,now:()=>now});const r=e.review('C1',3);const due=new Date(+r.card.dueAt+1000);
 const restored=await createReviewEngine({storage,now:()=>due});assert.equal(restored.isDue('C1'),true);const next=restored.review('C1',3);assert.equal(next.card.reps,2);assert.equal(restored.exportState().fsrs.history.length,2);assert.ok(+next.card.dueAt>+due);
});
test('wrong quiz flags do not create fictitious FSRS reviews',async()=>{
 const e=await createReviewEngine({storage:memory(),now:()=>now});e.saveFlags({C1:{weak:true}});assert.equal(e.summary().C1.weak,true);assert.equal(e.isNew('C1'),true);assert.equal(e.exportState().fsrs.history.length,0);
 e.review('C1',3,{clearWeak:true});assert.equal(e.summary().C1.weak,false);
});
test('storage failure never advances the in-memory card or history',async()=>{
 const storage=memory();const e=await createReviewEngine({storage,now:()=>now});storage.setItem=()=>{throw new Error('quota');};assert.throws(()=>e.review('C1',3));assert.equal(e.isNew('C1'),true);assert.equal(e.exportState().fsrs.history.length,0);
});
test('corrupt state is preserved and reported, never silently reset',async()=>{
 const storage=memory({[STATE_KEY]:'{broken'});await assert.rejects(createReviewEngine({storage}),/原始資料已保留/);assert.equal(storage.getItem(STATE_KEY),'{broken');
});
