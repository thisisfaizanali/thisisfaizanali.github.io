---
title: "Hello, and what this is"
date: "2026-08-28"
excerpt: "Why this blog exists and how a post actually gets published here."
---

This is the placeholder post. Replace it or delete it — either way, here's how the blog works.

## Publishing a post

Add a new `.md` file to `content/blog/`. The filename becomes the URL slug, so `content/blog/my-post.md` publishes at `/blog/my-post`. Every file needs three fields of frontmatter at the top:

```md
---
title: "Your title"
date: "2026-09-01"
excerpt: "One sentence for the list page."
---
```

Everything after the closing `---` is the post body in plain markdown — headings, links, code fences, tables, and blockquotes all render. Save the file, commit, push. There's no build step to run by hand and no separate login: the list page and each post route are generated from whatever is in that folder.

## Deleting a post

Delete the file. It disappears from the site on the next deploy.
