

<h1>
minimal-reactive <a href="https://npmjs.org/package/minimal-reactive"><img src="https://img.shields.io/badge/npm-v1.4.0-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-154-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/minimal-reactive@1.4.0/dist/minimal-reactive.min.js"><img src="https://img.shields.io/badge/brotli-1K-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
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

<p>  <details id="Change$50" title="Interface" ><summary><span><a href="#Change$50">#</a></span>  <code><strong>Change</strong></code>    </summary>  <a href=""></a>  <ul>        <p>  <details id="key$51" title="Property" ><summary><span><a href="#key$51">#</a></span>  <code><strong>key</strong></code>    </summary>  <a href=""></a>  <ul><p>string</p>        </ul></details><details id="next$53" title="Property" ><summary><span><a href="#next$53">#</a></span>  <code><strong>next</strong></code>    </summary>  <a href=""></a>  <ul><p>any</p>        </ul></details><details id="prev$52" title="Property" ><summary><span><a href="#prev$52">#</a></span>  <code><strong>prev</strong></code>    </summary>  <a href=""></a>  <ul><p>any</p>        </ul></details></p></ul></details><details id="IDep$9" title="Interface" ><summary><span><a href="#IDep$9">#</a></span>  <code><strong>IDep</strong></code>    </summary>  <a href=""></a>  <ul>        <p>  <details id="accessors$14" title="Property" ><summary><span><a href="#accessors$14">#</a></span>  <code><strong>accessors</strong></code>    </summary>  <a href=""></a>  <ul><p>{<p>  <details id="get$16" title="Method" ><summary><span><a href="#get$16">#</a></span>  <code><strong>get</strong></code><em>()</em>    </summary>  <a href=""></a>  <ul>    <p>      <p><strong>get</strong><em>()</em>  &nbsp;=&gt;  <ul>undefined | <code>null</code> | <a href="#T$23">T</a></ul></p></p>    </ul></details><details id="set$18" title="Method" ><summary><span><a href="#set$18">#</a></span>  <code><strong>set</strong></code><em>(value)</em>    </summary>  <a href=""></a>  <ul>    <p>    <details id="value$20" title="Parameter" ><summary><span><a href="#value$20">#</a></span>  <code><strong>value</strong></code>    </summary>    <ul><p><a href="#T$23">T</a></p>        </ul></details>  <p><strong>set</strong><em>(value)</em>  &nbsp;=&gt;  <ul>boolean</ul></p></p>    </ul></details></p>}</p>        </ul></details><details id="current$12" title="Property" ><summary><span><a href="#current$12">#</a></span>  <code><strong>current</strong></code>    </summary>  <a href=""></a>  <ul><p>undefined | <code>null</code> | <a href="#T$23">T</a></p>        </ul></details><details id="stackErr$13" title="Property" ><summary><span><a href="#stackErr$13">#</a></span>  <code><strong>stackErr</strong></code>    </summary>  <a href=""></a>  <ul><p><span>Error</span></p>        </ul></details><details id="subs$10" title="Property" ><summary><span><a href="#subs$10">#</a></span>  <code><strong>subs</strong></code>    </summary>  <a href=""></a>  <ul><p><span>Set</span>&lt;any&gt;</p>        </ul></details><details id="value$11" title="Property" ><summary><span><a href="#value$11">#</a></span>  <code><strong>value</strong></code>    </summary>  <a href=""></a>  <ul><p>undefined | <code>null</code> | <a href="#T$23">T</a></p>        </ul></details><details id="trigger$21" title="Method" ><summary><span><a href="#trigger$21">#</a></span>  <code><strong>trigger</strong></code><em>()</em>    </summary>  <a href=""></a>  <ul>    <p>      <p><strong>trigger</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p></ul></details><details id="Boxs$26" title="TypeAlias" ><summary><span><a href="#Boxs$26">#</a></span>  <code><strong>Boxs</strong></code>    </summary>  <a href=""></a>  <ul><p>[K   in   <span>StringKeys</span>&lt;<a href="#T$27">T</a>&gt;  ]:  <a href="#Dep$24">Dep</a>&lt;<a href="#T$27">T</a>  [<span>K</span>]&gt;</p>        </ul></details><details id="Dep$24" title="TypeAlias" ><summary><span><a href="#Dep$24">#</a></span>  <code><strong>Dep</strong></code>    </summary>  <a href=""></a>  <ul><p><a href="#IDep$9">IDep</a>&lt;<span>NonNullable</span>&lt;<a href="#T$25">T</a>&gt;&gt;</p>        </ul></details><details id="Fx$43" title="TypeAlias" ><summary><span><a href="#Fx$43">#</a></span>  <code><strong>Fx</strong></code>    </summary>  <a href=""></a>  <ul><p><details id="__type$44" title="Function" ><summary><span><a href="#__type$44">#</a></span>  <em>(deps, changes, prev)</em>    </summary>    <ul>    <p>    <details id="deps$46" title="Parameter" ><summary><span><a href="#deps$46">#</a></span>  <code><strong>deps</strong></code>    </summary>    <ul><p><a href="#Unboxs$28">Unboxs</a>&lt;<a href="#T$49">T</a>&gt;</p>        </ul></details><details id="changes$47" title="Parameter" ><summary><span><a href="#changes$47">#</a></span>  <code><strong>changes</strong></code>    </summary>    <ul><p><a href="#Change$50">Change</a>  []</p>        </ul></details><details id="prev$48" title="Parameter" ><summary><span><a href="#prev$48">#</a></span>  <code><strong>prev</strong></code>    </summary>    <ul><p><a href="#Unboxs$28">Unboxs</a>&lt;<a href="#T$49">T</a>&gt;</p>        </ul></details>  <p><strong></strong><em>(deps, changes, prev)</em>  &nbsp;=&gt;  <ul><a href="#OffFx$32">OffFx</a> | void</ul></p></p>    </ul></details></p>        </ul></details><details id="OffFx$32" title="TypeAlias" ><summary><span><a href="#OffFx$32">#</a></span>  <code><strong>OffFx</strong></code>    </summary>  <a href=""></a>  <ul><p><details id="__type$33" title="Function" ><summary><span><a href="#__type$33">#</a></span>  <em>(reconnect, disconnect)</em>    </summary>    <ul>    <p>    <details id="reconnect$35" title="Parameter" ><summary><span><a href="#reconnect$35">#</a></span>  <code><strong>reconnect</strong></code>    </summary>    <ul><p>boolean</p>        </ul></details><details id="disconnect$36" title="Parameter" ><summary><span><a href="#disconnect$36">#</a></span>  <code><strong>disconnect</strong></code>    </summary>    <ul><p>boolean</p>        </ul></details>  <p><strong></strong><em>(reconnect, disconnect)</em>  &nbsp;=&gt;  <ul>any</ul></p></p>    </ul></details></p>        </ul></details><details id="Sub$37" title="TypeAlias" ><summary><span><a href="#Sub$37">#</a></span>  <code><strong>Sub</strong></code>    </summary>  <a href=""></a>  <ul><p><details id="__type$38" title="Function" ><summary><span><a href="#__type$38">#</a></span>  <em>(prevValue, nextValue)</em>    </summary>    <ul>    <p>    <details id="prevValue$40" title="Parameter" ><summary><span><a href="#prevValue$40">#</a></span>  <code><strong>prevValue</strong></code>    </summary>    <ul><p><a href="#T$42">T</a> | <code>null</code> | undefined</p>        </ul></details><details id="nextValue$41" title="Parameter" ><summary><span><a href="#nextValue$41">#</a></span>  <code><strong>nextValue</strong></code>    </summary>    <ul><p><a href="#T$42">T</a> | <code>null</code> | undefined</p>        </ul></details>  <p><strong></strong>&lt;<span>T</span>&gt;<em>(prevValue, nextValue)</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p>        </ul></details><details id="Unboxs$28" title="TypeAlias" ><summary><span><a href="#Unboxs$28">#</a></span>  <code><strong>Unboxs</strong></code>    </summary>  <a href=""></a>  <ul><p>[K   in   keyof     <a href="#T$29">T</a>  ]-?:  <span>NonNullable</span>&lt;<a href="#T$29">T</a>  [<span>K</span>]  [<code>"value"</code>]&gt;</p>        </ul></details><details id="Vals$30" title="TypeAlias" ><summary><span><a href="#Vals$30">#</a></span>  <code><strong>Vals</strong></code>    </summary>  <a href=""></a>  <ul><p>[K   in   keyof     <a href="#T$31">T</a>  ]:  <a href="#T$31">T</a>  [<span>K</span>]  [<code>"value"</code>]</p>        </ul></details><details id="dep$1" title="Function" ><summary><span><a href="#dep$1">#</a></span>  <code><strong>dep</strong></code><em>(value)</em>    </summary>  <a href=""></a>  <ul>    <p>    <details id="value$4" title="Parameter" ><summary><span><a href="#value$4">#</a></span>  <code><strong>value</strong></code>    </summary>    <ul><p><code>null</code> | <a href="#T$3">T</a></p>        </ul></details>  <p><strong>dep</strong>&lt;<span>T</span>&gt;<em>(value)</em>  &nbsp;=&gt;  <ul><a href="#Dep$24">Dep</a>&lt;<a href="#T$3">T</a>&gt;</ul></p></p>    </ul></details><details id="deps$5" title="Function" ><summary><span><a href="#deps$5">#</a></span>  <code><strong>deps</strong></code><em>(obj)</em>    </summary>  <a href=""></a>  <ul>    <p>    <details id="obj$8" title="Parameter" ><summary><span><a href="#obj$8">#</a></span>  <code><strong>obj</strong></code>    </summary>    <ul><p><a href="#T$7">T</a></p>        </ul></details>  <p><strong>deps</strong>&lt;<span>T</span>&gt;<em>(obj)</em>  &nbsp;=&gt;  <ul><a href="#Boxs$26">Boxs</a>&lt;<a href="#T$7">T</a>&gt;</ul></p></p>    </ul></details><details id="effect$54" title="Function" ><summary><span><a href="#effect$54">#</a></span>  <code><strong>effect</strong></code><em>(deps, fn)</em>    </summary>  <a href=""></a>  <ul>    <p>    <details id="deps$57" title="Parameter" ><summary><span><a href="#deps$57">#</a></span>  <code><strong>deps</strong></code>    </summary>    <ul><p><a href="#T$56">T</a></p>        </ul></details><details id="fn$58" title="Parameter" ><summary><span><a href="#fn$58">#</a></span>  <code><strong>fn</strong></code>    </summary>    <ul><p><a href="#Fx$43">Fx</a>&lt;<a href="#T$56">T</a>&gt;</p>        </ul></details>  <p><strong>effect</strong>&lt;<span>T</span><span>&nbsp;extends&nbsp;</span>     <a href="#Boxs$26">Boxs</a>&lt;any&gt;&gt;<em>(deps, fn)</em>  &nbsp;=&gt;  <ul><a href="#OffFx$32">OffFx</a></ul></p></p>    </ul></details></p>

## Credits
- [everyday-types](https://npmjs.org/package/everyday-types) by [stagas](https://github.com/stagas) &ndash; Everyday utility types
- [everyday-utils](https://npmjs.org/package/everyday-utils) by [stagas](https://github.com/stagas) &ndash; Everyday utilities

## Contributing

[Fork](https://github.com/stagas/minimal-reactive/fork) or [edit](https://github.dev/stagas/minimal-reactive) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
