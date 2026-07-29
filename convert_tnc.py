import re

with open(r'D:\work\PuremotionAI\gemini-code-1785342033936.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove cite tags
content = re.sub(r'\[cite:\s*\d+\]', '', content)

# Add Header and Footer imports
content = content.replace("import React from 'react';", "import React from 'react';\nimport Header from './Header';\nimport Footer from './Footer';")

# Inject Header and Footer into JSX return
content = content.replace('    <div className="min-h-screen', '    <>\n      <Header />\n      <div className="min-h-screen')

content = content.replace('    </div>\n  );\n};', '    </div>\n      <Footer />\n    </>\n  );\n};')

with open(r'd:\work\PuremotionAI\src\Shared\TnC.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
