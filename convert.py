import re
import os

with open('policy_output.txt', 'r', encoding='utf-8') as f:
    lines = [line.strip() for line in f if line.strip()]

jsx_lines = []
jsx_lines.append('import React from "react";')
jsx_lines.append('import Footer from "./Footer";')
jsx_lines.append('import Header from "./Header";\n')
jsx_lines.append('function PrivacyPolicy() {')
jsx_lines.append('  return (')
jsx_lines.append('    <section>')
jsx_lines.append('      <Header />')
jsx_lines.append('      <div className="max-w-4xl mx-auto px-5 py-10 text-gray-800 leading-relaxed sm:px-8 sm:py-16">')

def process_line(line):
    # Escape { and } if any
    line = line.replace('{', '{{').replace('}', '}}')
    
    if line == 'Privacy Policy':
        return f'<h1 className="text-3xl font-bold mb-8 text-[#2B2118] sm:text-4xl">{line}</h1>'
    elif re.match(r'^\d+\.\s+[A-Z]', line) or line == 'Contents' or line == 'Privacy at a glance':
        return f'<h2 className="text-xl font-bold mt-10 mb-4 text-[#2B2118] sm:text-2xl">{line}</h2>'
    elif re.match(r'^\d+\.\d+\s+[A-Z]', line):
        return f'<h3 className="text-lg font-semibold mt-6 mb-3 text-[#2B2118]">{line}</h3>'
    elif line == 'Contact PureMotion':
        return f'<h2 className="text-xl font-bold mt-10 mb-4 text-[#2B2118] sm:text-2xl">{line}</h2>'
    else:
        # Detect emails and links to make them clickable or formatted
        if '@' in line and not line.startswith('<'):
            line = re.sub(r'([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)', r'<a href="mailto:\1" className="text-[#8B6A2B] hover:underline">\1</a>', line)
        if 'http' in line and not line.startswith('<'):
            line = re.sub(r'(https?://\S+)', r'<a href="\1" className="text-[#8B6A2B] hover:underline">\1</a>', line)
        return f'<p className="mb-4 text-[15px] sm:text-base text-[#5C4A32]">{line}</p>'

in_ul = False
for line in lines:
    if line.startswith('• '):
        if not in_ul:
            jsx_lines.append('<ul className="list-disc ml-6 mb-4 space-y-2 text-[15px] sm:text-base text-[#5C4A32]">')
            in_ul = True
        escaped_line = line[2:].replace('{', '{{').replace('}', '}}')
        jsx_lines.append(f'  <li>{escaped_line}</li>')
    else:
        if in_ul:
            jsx_lines.append('</ul>')
            in_ul = False
        jsx_lines.append('        ' + process_line(line))

if in_ul:
    jsx_lines.append('</ul>')

jsx_lines.append('      </div>')
jsx_lines.append('      <Footer />')
jsx_lines.append('    </section>')
jsx_lines.append('  );')
jsx_lines.append('}\n')
jsx_lines.append('export default PrivacyPolicy;')

with open('src/Shared/PrivacyPolicy.jsx', 'w', encoding='utf-8') as f:
    f.write('\n'.join(jsx_lines))
