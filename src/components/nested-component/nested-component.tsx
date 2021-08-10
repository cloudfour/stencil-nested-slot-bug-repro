import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'nested-component',
})
export class NestedComponent {
  @Prop() state;

  render() {

    return (
      <Host>
        <div>State: {this.state.toString()}</div>
        <slot />
      </Host>
    );
  }
}
