import { Component, Host, Prop, State, h, Element } from '@stencil/core';

@Component({
  tag: 'focus-trap',
})
export class FocusTrap {
  @Element() hostElement: HTMLElement;
  /**
   * Manually enable or disable the trap.
   */
  @Prop() enabled = true;
  @State() active = false;

  private activeElement?: Element | null;

  /**
   * Focus traps should only begin to trap focus once focus has entered them,
   * and they should be disabled if a user clicks out or focus is
   * programatically set outside the trap.
   * We listen for document focusin events and check whether they're within our
   * trap to toggle our active state.
   */
  listenForFocus = (e: FocusEvent) => {
    this.active = this.hostElement.contains(e.target as HTMLElement);
  };

  /**
   * Focus traps are traditionally built by listening for <kbd>Tab</kbd> key
   * presses, to determine when to manually set focus. However this does not
   * work well when a focus trap begins or ends with an external `iframe`, as
   * the `iframe` swallows
   * keyboard events.
   *
   * To work around this limitation we've implemented focus "bumper" elements.
   * These elements are placed at the beginning and the end of the trap. When they
   * receive focus they call this function which immediately sets focus to the
   * first or last focusable, non-bumper element in the trap.
   *
   * @param event - our focus event
   * @param end - are we at the end of the dialog?
   */
  bumpFocus(event: FocusEvent) {
    // Prevent focusing on our bumper
    event.preventDefault();
  }

  /**
   * Attach and detach our events listeners when the component loads and
   * disconnects.
   * We use `focusin` since it bubbles up to the document (unlike `focus`).
   */
  componentDidLoad() {
    document.addEventListener('focusin', this.listenForFocus);
  }

  disconnectedCallback() {
    document.removeEventListener('focusin', this.listenForFocus);
  }

  /**
   * We noticed an odd bug with Focus Traps in sheets that were within the
   * Header and Footer components.
   *
   * When the sheet opened we enabled focus trapping by setting `enabled` to
   * true on the inner Focus Trap component.
   *
   * This caused the Focus Trap to re-render. During the re-render, if an
   * element inside the focus trap was focused it would lose focus.
   *
   * We added some special logic to avoid this. Before the Focus Trap renders
   * we grab the active element. After the Focus Trap renders we re-focus the
   * element that was focused before it rendered.
   *
   * This feels a little hacky but seems to work fine. The Focus Trap render
   * should be nearly instant, so the chances of this having unintended
   * consequences are very low.
   */
  componentWillRender() {
    this.activeElement = document.activeElement;
  }

  componentDidRender() {
    if (this.activeElement && this.activeElement !== document.activeElement) {
      (this.activeElement as HTMLElement).focus();
    }
  }

  render() {
    // Our bumper elements
    // Normally it's a bad practice to use divs as interactive elements, but in
    // this case I'm intentionally using an element that doesn't have semantic
    // meaning, since the bumpers should not provide any semantic context.
    // (this is also why they're aria-hidden)
    // When the trap is enabled and active the bumpers are shown. When they're
    // focused they call our `bumpFocus` method.
    const bumper = () => {
      return (
        <div
          tabindex="0"
          class="focus-trap__bumper"
          aria-hidden="true"
          hidden={!this.active || !this.enabled}
          onFocusin={(e) => this.bumpFocus(e)}
        />
      );
    };

    return (
      <Host class="focus-trap">
        {bumper()}
        <slot />
        {bumper()}
      </Host>
    );
  }
}
