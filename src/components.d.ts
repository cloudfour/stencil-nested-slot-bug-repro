/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MyComponent {
    }
    interface NestedComponent {
        "state": boolean;
    }
}
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLNestedComponentElement extends Components.NestedComponent, HTMLStencilElement {
    }
    var HTMLNestedComponentElement: {
        prototype: HTMLNestedComponentElement;
        new (): HTMLNestedComponentElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "nested-component": HTMLNestedComponentElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
    }
    interface NestedComponent {
        "state"?: boolean;
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "nested-component": NestedComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "nested-component": LocalJSX.NestedComponent & JSXBase.HTMLAttributes<HTMLNestedComponentElement>;
        }
    }
}
