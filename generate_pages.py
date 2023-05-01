from os import listdir, mkdir, rename
import markdown
import frontmatter
from templates import document, article, homepage, titlepage

article_template = article.template
document_template = document.template
home_page_template = homepage.template
title_plage_template = titlepage.template

project_folder = './content/projects'
learning_folder = './content/workshops'
about_file = './content/pages/cv.md'

def get_files_from_folder(folder):
    return sorted(listdir(folder))

def get_markdown_data_from_files(folder):
    files = get_files_from_folder(folder)
    data = []
    for file in files:
        path = "{}/{}".format(folder, file)
        md = frontmatter.load(path)
        md['date'] = '-'.join(file.split('-')[:2])
        data.append(md)
    return data

def get_featured(data):
    featured = []
    for item in data:
        if "featured" in item.keys():
            featured.append(item)
    return featured

def render_articles(articles):
    html = ''
    for md in articles:
        html += article_template(md)
    return html

def render_articles_by_year(articles):
    html = ''
    year = None
    for md in articles:
        current_year = md['date'].split('-')[0]
        if year != current_year:
            year = current_year
            html += '<h3 class="year">{year}</h3>'.format(year=current_year)
        html += article_template(md)
    return html


projects_data = get_markdown_data_from_files(project_folder)
featured_projects_list = get_featured(projects_data)
projects_html = render_articles_by_year(projects_data[::-1])
featured_projects_html = render_articles(featured_projects_list[::-1])

learning_data = get_markdown_data_from_files(learning_folder)
featured_learning_list = get_featured(learning_data)
learning_html = render_articles_by_year(learning_data[::-1])
featured_learning_html = render_articles(featured_learning_list[::-1])

home_page_html = document_template({
    "main": home_page_template({
        "featured_projects": featured_projects_html,
        "featured_learning": featured_learning_html
    })
})
projects_page_html = document_template({
    "main": title_plage_template({
        "title": "Projects",
        "content": projects_html
    })
})
learning_page_html = document_template({
    "main": title_plage_template({
        "title": "Learning",
        "content": learning_html
    })
})

with open('index.html', 'w') as f:
    f.write(home_page_html)

with open('projects.html', 'w') as f:
    f.write(projects_page_html)

with open('learning.html', 'w') as f:
    f.write(learning_page_html)
