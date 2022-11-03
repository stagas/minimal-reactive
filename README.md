

<h1>
minimal-reactive <a href="https://npmjs.org/package/minimal-reactive"><img src="https://img.shields.io/badge/npm-v1.0.1-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-83-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/minimal-reactive@1.0.1/dist/minimal-reactive.min.js"><img src="https://img.shields.io/badge/brotli-342b-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
</h1>

<p></p>

Smallest possible implementation of reactive programming, effects and dependencies.

<h4>
<table><tr><td title="Triple click to select and copy paste">
<code>npm i minimal-reactive </code>
</td><td title="Triple click to select and copy paste">
<code>pnpm add minimal-reactive </code>
</td><td title="Triple click to select and copy paste">
<code>yarn add minimal-reactive</code>
</td></tr></table>
</h4>

## Examples

<details id="example$basic" title="basic" open><summary><span><a href="#example$basic">#</a></span>  <code><strong>basic</strong></code></summary>  <ul>    <details id="source$basic" title="basic source code" open><summary><span><a href="#source$basic">#</a></span>  <code><strong>view source</strong></code></summary>  <a href="example/basic.ts">example/basic.ts</a>  <p>

```ts
import { dep, effect } from 'minimal-reactive'

const a = dep(3)
const b = dep(4)

effect({ a, b }, ({ a, b }) => {
  // a + b are unboxed here
  const result = a + b

  console.log(result)

  return () => {
    // dispose
  }
}) // prints 7

// changing values
a.value = 2 // prints 6
b.value = 3 // prints 5
```

</p>
</details></ul></details>


## API

<p>  <details id="Dep$10" title="Interface" ><summary><span><a href="#Dep$10">#</a></span>  <code><strong>Dep</strong></code>    </summary>  <a href=""></a>  <ul>        <p>  <details id="subscribers$11" title="Property" ><summary><span><a href="#subscribers$11">#</a></span>  <code><strong>subscribers</strong></code>    </summary>  <a href=""></a>  <ul><p><span>Set</span>&lt;any&gt;</p>        </ul></details><details id="value$12" title="Property" ><summary><span><a href="#value$12">#</a></span>  <code><strong>value</strong></code>    </summary>  <a href=""></a>  <ul><p>undefined | <code>null</code> | <a href="#T$13">T</a></p>        </ul></details></p></ul></details><details id="BoxedDeps$14" title="TypeAlias" ><summary><span><a href="#BoxedDeps$14">#</a></span>  <code><strong>BoxedDeps</strong></code>    </summary>  <a href=""></a>  <ul><p>[K   in   keyof     <a href="#T$15">T</a>  ]:  <a href="#Dep$10">Dep</a>&lt;<a href="#T$15">T</a>  [<span>K</span>]&gt;</p>        </ul></details><details id="DepCallback$23" title="TypeAlias" ><summary><span><a href="#DepCallback$23">#</a></span>  <code><strong>DepCallback</strong></code>    </summary>  <a href=""></a>  <ul><p><details id="__type$24" title="Function" ><summary><span><a href="#__type$24">#</a></span>  <em>(prevValue, nextValue)</em>    </summary>    <ul>    <p>    <details id="prevValue$26" title="Parameter" ><summary><span><a href="#prevValue$26">#</a></span>  <code><strong>prevValue</strong></code>    </summary>    <ul><p><a href="#T$28">T</a> | <code>null</code> | undefined</p>        </ul></details><details id="nextValue$27" title="Parameter" ><summary><span><a href="#nextValue$27">#</a></span>  <code><strong>nextValue</strong></code>    </summary>    <ul><p><a href="#T$28">T</a> | <code>null</code> | undefined</p>        </ul></details>  <p><strong></strong>&lt;<span>T</span>&gt;<em>(prevValue, nextValue)</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p>        </ul></details><details id="Deps$16" title="TypeAlias" ><summary><span><a href="#Deps$16">#</a></span>  <code><strong>Deps</strong></code>    </summary>  <a href=""></a>  <ul><p>[K   in   keyof     <a href="#T$17">T</a>  ]-?:  <span>NonNullable</span>&lt;<a href="#T$17">T</a>  [<span>K</span>]  [<code>"value"</code>]&gt;</p>        </ul></details><details id="Dispose$20" title="TypeAlias" ><summary><span><a href="#Dispose$20">#</a></span>  <code><strong>Dispose</strong></code>    </summary>  <a href=""></a>  <ul><p><details id="__type$21" title="Function" ><summary><span><a href="#__type$21">#</a></span>  <em>()</em>    </summary>    <ul>    <p>      <p><strong></strong><em>()</em>  &nbsp;=&gt;  <ul>any</ul></p></p>    </ul></details></p>        </ul></details><details id="Fx$29" title="TypeAlias" ><summary><span><a href="#Fx$29">#</a></span>  <code><strong>Fx</strong></code>    </summary>  <a href=""></a>  <ul><p><details id="__type$30" title="Function" ><summary><span><a href="#__type$30">#</a></span>  <em>(deps)</em>    </summary>    <ul>    <p>    <details id="deps$32" title="Parameter" ><summary><span><a href="#deps$32">#</a></span>  <code><strong>deps</strong></code>    </summary>    <ul><p><a href="#Deps$16">Deps</a>&lt;<a href="#T$33">T</a>&gt;</p>        </ul></details>  <p><strong></strong><em>(deps)</em>  &nbsp;=&gt;  <ul><a href="#Dispose$20">Dispose</a> | void</ul></p></p>    </ul></details></p>        </ul></details><details id="Values$18" title="TypeAlias" ><summary><span><a href="#Values$18">#</a></span>  <code><strong>Values</strong></code>    </summary>  <a href=""></a>  <ul><p>[K   in   keyof     <a href="#T$19">T</a>  ]:  <a href="#T$19">T</a>  [<span>K</span>]  [<code>"value"</code>]</p>        </ul></details><details id="dep$1" title="Function" ><summary><span><a href="#dep$1">#</a></span>  <code><strong>dep</strong></code><em>(value)</em>    </summary>  <a href=""></a>  <ul>    <p>    <details id="value$4" title="Parameter" ><summary><span><a href="#value$4">#</a></span>  <code><strong>value</strong></code>    </summary>    <ul><p><code>null</code> | <a href="#T$3">T</a></p>        </ul></details>  <p><strong>dep</strong>&lt;<span>T</span>&gt;<em>(value)</em>  &nbsp;=&gt;  <ul><a href="#Dep$10">Dep</a>&lt;<a href="#T$3">T</a>&gt;</ul></p></p>    </ul></details><details id="effect$5" title="Function" ><summary><span><a href="#effect$5">#</a></span>  <code><strong>effect</strong></code><em>(deps, fn)</em>    </summary>  <a href=""></a>  <ul>    <p>    <details id="deps$8" title="Parameter" ><summary><span><a href="#deps$8">#</a></span>  <code><strong>deps</strong></code>    </summary>    <ul><p><a href="#T$7">T</a></p>        </ul></details><details id="fn$9" title="Parameter" ><summary><span><a href="#fn$9">#</a></span>  <code><strong>fn</strong></code>    </summary>    <ul><p><a href="#Fx$29">Fx</a>&lt;<a href="#T$7">T</a>&gt;</p>        </ul></details>  <p><strong>effect</strong>&lt;<span>T</span><span>&nbsp;extends&nbsp;</span>     <a href="#BoxedDeps$14">BoxedDeps</a>&lt;any&gt;&gt;<em>(deps, fn)</em>  &nbsp;=&gt;  <ul><a href="#Dispose$20">Dispose</a></ul></p></p>    </ul></details></p>



## Contributing

[Fork](https://github.com/stagas/minimal-reactive/fork) or [edit](https://github.dev/stagas/minimal-reactive) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
