import { createApp } from "vue";
import "./app.styl";
import { Form, FormItem, Toast, Picker } from "@nutui/nutui-taro";

const App = createApp({
  onShow() {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(Form);
App.use(FormItem);
App.use(Toast);
App.use(Picker);
export default App;
