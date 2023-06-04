# Personal website, portfolio and blog

Hey! This is my personal website.

Check [murilopolese.com](http://www.murilopolese.com) to see how it looks like.

I used to have a very complicated javascript website but now it's a less complicated static thing built with python.

## Building

Create a virtual environment (`venv`) for installing the libraries locally.

```
python -m venv venv
source venv/bin/activate
```

Make sure you have `markdown`, `frontmatter` and `Pillow` installed.

```
pip install markdown python-frontmatter Pillow
```

Generate the thumbnails:

```
python generate_thumbnails.py
```

Generate html pages:

```
python generate_pages.py
```

## Deploy

aws s3 sync ./ s3://www.murilopolese.com/ --exclude '.*' --exclude './venv' --acl public-read
