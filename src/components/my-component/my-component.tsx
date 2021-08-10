import { Component, State, h, Host } from '@stencil/core';

@Component({
  tag: 'my-component',
})
export class MyComponent {
  @State() enabled = true;

  updateState() {
    this.enabled = !this.enabled;
  }

  render() {
    return <Host>
      <div style={{ background: '#eee', margin: '1em', padding: '1em' }}>
        <button onClick={() => this.updateState()}>Update State</button>

        <focus-trap enabled={this.enabled}>
          <slot />
        </focus-trap>
      </div>
    </Host>;
  }
}
