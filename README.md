# gitcanvas

#### Waste your time like you never did before!

![gitcanvas.png][1]

## What is this?

`gitcanvas` is a service _and_ command-line tool that facilitates "drawing" in your contribution summary on GitHub, by creating commits for you in the right places.

Just hop onto the site, _draw something_, commit with the CLI, and done! :rocket:

![web.png][2]

# Using the CLI

Sit in the repository you want to generate the commits on, and then use `gitcanvas` CLI.

```shell
gitcanvas --help
gitcanvas --dry-run some.json
gitcanvas some.json
```

It'll generate a bunch of commits _(no pushing around, so you can take it back)_.

![commits.png][3]

This is mostly harmless, as commits will be empty. No changes are part of the commit. You could always use the `--dry-run` flag to see what the commands would look like.

Take into consideration that other people only see your _public contribution activity_, so using `gitcanvas` on a private repo won't always have the desired effect (showing off a cool, pixelated drawing).

# Hosting the web application

No special treatment, just `node app`, done.

# Why, God, Why?

Boredom, insomnia, and I just had to find a use for [emoji-random](https://github.com/bevacqua/node-emoji-random), which is largely useless too.

  [1]: https://github.com/bevacqua/gitcanvas/blob/master/dat/gitcanvas.png?raw=true
  [2]: https://github.com/bevacqua/gitcanvas/blob/master/dat/web.png?raw=true
  [3]: https://github.com/bevacqua/gitcanvas/blob/master/dat/commits.png?raw=true
