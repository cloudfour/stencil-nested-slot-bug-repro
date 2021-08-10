import { Component, State, h, Host } from '@stencil/core';

@Component({
  tag: 'my-component',
})
export class MyComponent {
  @State() count = 0;

  updateState() {
    this.count = this.count + 1;
  }

  render() {
    return <Host>
      <div style={{ background: '#eee', margin: '1em', padding: '1em' }}>
        <button onClick={() => this.updateState()}>Update State</button>
        <p>Count: {this.count}</p>
        <slot />
      </div>
    </Host>;
  }
}
