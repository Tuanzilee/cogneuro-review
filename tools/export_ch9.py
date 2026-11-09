"""把 content_ch9.QUESTIONS 輸出成 essay_detail_ch9.json，並寫朗讀稿（給 TTSMaker 用）。"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import content_ch9 as C
out = []
nd = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tools', 'narration_ch9')
os.makedirs(nd, exist_ok=True)
for q in C.QUESTIONS:
    secs = []
    for s in q['sections']:
        h = s['html'].replace('<table>', '<div class="tw"><table>').replace('</table>', '</table></div>')
        secs.append({'h': s['h'], 'html': h})
    eid = 'E_' + q['no'].replace('.', '_')
    out.append({'id': eid, 'no': q['no'], 'ch': int(q['no'].split('.')[0]), 'tier': q['tier'], 'title': q['title'], 'signal': q['signal'],
                'answer1': q['answer1'], 'skeleton': q['skeleton'], 'sections': secs, 'traps': q['traps'], 'oral': q['oral'],
                'sources': q['sources'], 'pri': q['pri']})
    open(os.path.join(nd, eid + '.txt'), 'w', encoding='utf8').write(q['narration'].strip() + '\n')
json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'essay_detail_ch9.json'), 'w', encoding='utf8'), ensure_ascii=False, indent=1)
print(len(out), '題')
