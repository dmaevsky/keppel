## keppel
A wannabe template engine compiling to HTML. I basically created it as a usage example of [rd-parse](https://github.com/dmaevsky/rd-parse) - a generic minimalist recursive descent parser written in Javascript, and allowing you to define your grammar in pure Javascript as well.

The Keppel grammar is quite closely following the main traits of [Jade](http://jade-lang.com/) except for the fact it does not rely on white space to generate the markup. For instance:

    body [
      div.navbar.navbar-inverse.navbar-fixed-top [
        div.navbar-inner [
          a(href="#").brand ['Awesome']
          ul.nav [
            li[ a(href="#") ['Item 1'] ]
            li[ a(href="#") ['Item 2'] ]
          ]
        ]
      ]
    ]

compiles to

    <body>
      <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="navbar-inner">
          <a href="#" class="brand">Awesome</a>
          <ul class="nav">
            <li><a href="#">Item 1</a></li>
            <li><a href="#">Item 2</a></li>
          </ul>
        </div>
      </div>
    </body>

However, using [rd-parse](https://github.com/dmaevsky/rd-parse.git) it is quite easy to generate your own grammars and template engines. So, feel free to fork it and use it as you wish :)

## NOTE

**The grammar for Keppel has moved to the [examples folder of the rd-parse repository](https://github.com/dmaevsky/rd-parse/tree/master/examples/keppel) and has been adapted to the 1.x release of rd-parser.**