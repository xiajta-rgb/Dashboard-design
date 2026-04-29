#!/usr/bin/env python3
"""
Dashboard Generator Script
Automates creating a new dashboard component and updating configurations.
"""

import os
import re
from pathlib import Path


def kebab_to_pascal(s):
    """Convert kebab-case to PascalCase."""
    return ''.join(word.capitalize() for word in s.split('-'))


def get_project_root():
    """Get project root directory."""
    return Path(__file__).parent.parent.parent.parent


def load_template():
    """Load dashboard template."""
    template_path = get_project_root() / '.trae' / 'skills' / 'dashboard-generator' / 'dashboard-template.jsx'
    with open(template_path, 'r', encoding='utf-8') as f:
        return f.read()


def create_dashboard_component(style_id, style_label):
    """Create a new dashboard component file."""
    component_name = kebab_to_pascal(style_id) + 'Dashboard'
    template = load_template()
    
    # Replace placeholders
    content = template.replace('StyleNameDashboard', f'{kebab_to_pascal(style_id)}Dashboard')
    content = content.replace('StyleName', kebab_to_pascal(style_id))
    content = content.replace('style-id', style_id)
    
    # Write component file
    output_path = get_project_root() / 'src' / 'dashboards' / f'{component_name}.jsx'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'✓ Created {output_path}')
    return component_name


def update_dashboard_config(style_id, style_label, colors, description, description_zh, group, use_cases):
    """Update dashboard-config.js with new style."""
    config_path = get_project_root() / 'src' / 'dashboard-config.js'
    
    with open(config_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Create style config object
    style_config = f"""
  {{ 
    id: '{style_id}', 
    label: '{style_label}', 
    group: '{group}', 
    description: '{description}', 
    descriptionZh: '{description_zh}', 
    colors: {{ 
      primary: '{colors['primary']}', 
      secondary: '{colors['secondary']}', 
      accent: '{colors['accent']}', 
      highlight: '{colors['highlight']}' 
    }}, 
    useCases: {repr(use_cases)}, 
    complexity: 2, 
    techDifficulty: 1, 
    contrast: 'AA', 
    typography: {{ primary: 'Inter', secondary: 'SF Pro' }}, 
    borderRadius: '12px', 
    shadows: '微妙投影', 
    animations: '淡入淡出', 
    spacing: '12px基准', 
    borderWidth: '1px', 
    darkMode: '需适配', 
    responsive: '良好', 
    performance: '高', 
    accessibility: '良好' 
  }},"""
    
    # Insert before the closing bracket of styles array
    insert_pattern = r'(?=\n\])'
    new_content = re.sub(insert_pattern, style_config, content)
    
    with open(config_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f'✓ Updated {config_path}')


def update_app_js_imports(style_id, component_name):
    """Update App.js to include new dashboard imports."""
    app_path = get_project_root() / 'src' / 'App.jsx'
    
    with open(app_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add lazy import
    lazy_import = f"  '{style_id}': () => import('./dashboards/{component_name}'),"
    import_pattern = r'(const DashboardImports = \{[^}]+)(?=\n\})'
    
    if lazy_import not in content:
        content = re.sub(import_pattern, r'\1\n' + lazy_import, content)
    
    # Add dashboard component
    dashboard_comp = f"  '{style_id}': lazy(DashboardImports['{style_id}']),"
    dashboard_pattern = r'(const dashboardComponents = \{[^}]+)(?=\n\})'
    
    if dashboard_comp not in content:
        content = re.sub(dashboard_pattern, r'\1\n' + dashboard_comp, content)
    
    # Add eager import
    eager_import = f"import {component_name} from './dashboards/{component_name}'"
    eager_pattern = r'(// Eagerly loaded dashboards for preview rendering)'
    
    if eager_import not in content:
        content = re.sub(eager_pattern, r'\1\n' + eager_import, content)
    
    # Add to preview components
    preview_comp = f"  '{style_id}': {component_name},"
    preview_pattern = r'(const previewComponents = \{[^}]+)(?=\n\})'
    
    if preview_comp not in content:
        content = re.sub(preview_pattern, r'\1\n' + preview_comp, content)
    
    with open(app_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'✓ Updated {app_path}')


def main():
    """Main function to create a new dashboard."""
    print("=== Dashboard Generator ===\n")
    
    # Get user input
    style_id = input("Enter style ID (kebab-case, e.g., 'my-awesome-style'): ").strip()
    style_label = input("Enter style label (human-readable, e.g., 'My Awesome Style'): ").strip()
    group = input("Enter group (e.g., 'Modern', 'SaaS', 'Niche', 'Scientific'): ").strip() or 'Modern'
    
    print("\nEnter colors (hex format, e.g., '#ffffff'):")
    colors = {
        'primary': input("  Primary color: ").strip() or '#0f172a',
        'secondary': input("  Secondary color: ").strip() or '#1e293b',
        'accent': input("  Accent color: ").strip() or '#334155',
        'highlight': input("  Highlight color: ").strip() or '#6366f1',
    }
    
    description = input("\nEnter description (English): ").strip() or 'A modern dashboard style'
    description_zh = input("Enter description (Chinese): ").strip() or '现代化仪表盘风格'
    
    use_cases_input = input("\nEnter use cases (comma-separated): ").strip()
    use_cases = [uc.strip() for uc in use_cases_input.split(',')] if use_cases_input else ['数据可视化', '仪表板']
    
    print("\n=== Generating Dashboard ===")
    
    # Create component
    component_name = create_dashboard_component(style_id, style_label)
    
    # Update config
    update_dashboard_config(style_id, style_label, colors, description, description_zh, group, use_cases)
    
    # Update App.js
    update_app_js_imports(style_id, component_name)
    
    print("\n=== Done! ===")
    print(f"Your new dashboard '{style_label}' has been created!")
    print(f"Component file: src/dashboards/{component_name}.jsx")
    print("\nNext steps:")
    print("1. Customize the component file to fit your style")
    print("2. Run the dev server to test your new dashboard")


if __name__ == '__main__':
    main()
