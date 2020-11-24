# Personal website, portfolio and blog

Hey! This is my personal website.

Check [murilopolese.com](http://www.murilopolese.com) to see how it looks like.

## Deploy

aws s3 sync ./public/ s3://www.murilopolese.com/ --exclude '.*' --acl public-read
