# THE PLATFORM. FRONTEND. UIKIT

## Component Requirements

* **Single responsibility**. One component defines a minimal business entity.
* **Ease of implementation**. The component must contain a minimum amount of code.
* **Independence**. The component should not know anything about the other components on the page.
* **Anonymity of communication**. Communication between components on the same screen should be through a separate entity, which, should only receive input data and not know which component transmitted this data.
* **Single state UI**. This will help us to easily restore the state of the screen and understand what exactly is displayed on the screen at the moment.
* **Unidirectional data flow**. The state of a component should be uniquely determined and there should be only one entity capable of changing this state.
* **Disconnectability**. Each component should be easily disabled through the feature toggles mechanism. For example, in one of the components there is a critical bug, and you need to turn off the whole component in order to avoid an error. In another case, we include some feature only for certain users.
