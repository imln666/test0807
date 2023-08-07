<template>
  <div class="index">
    <section class="content">
      <p class="tag">请完善您的信息，我们将通过邮件为您发送下载地址。</p>
      <nut-config-provider :theme-vars="themeVars">
        <nut-form :model-value="dynamicRefForm" ref="dynamicRefForm">
          <template v-for="(item, index) in formFakeData" :key="index">
            <nut-form-item
              v-if="item.type !== 'singleSelect'"
              :show-error-message="false"
            >
              <div class="label">{{ item.label }}</div>
              <nut-input
                v-model="item.value"
                class="nut-input-text"
                :placeholder="`请输入${item.label}`"
                :type="item.type"
              />
            </nut-form-item>
            <nut-form-item
              :key="index"
              :show-error-message="false"
              v-else
              body-align="right"
            >
              <template v-slot:label>
                <div class="label">{{ item.label }}</div>
              </template>
              <template v-slot>
                <div class="industry">
                  <p>{{ item.value }}</p>
                  <icon-font
                    name="rect-right"
                    @click="handleClickSingleSelect(item, index)"
                  />
                </div>
              </template>
            </nut-form-item>
          </template>
        </nut-form>
      </nut-config-provider>
    </section>
    <section class="bottom">
      <nut-button
        color="#3b8746"
        shape="square"
        type="primary"
        @click="dynamicForm.methods.submit"
        >确认提交</nut-button
      >
    </section>
  </div>
  <nut-toast
    :msg="page.state.msg"
    v-model:visible="page.state.show"
    type="warning"
  />
  <nut-popup position="bottom" v-model:visible="show">
    <nut-picker
      :columns="columns"
      title="请选择行业"
      @confirm="popupConfirm"
      @cancel="show = false"
    >
    </nut-picker>
  </nut-popup>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { IconFont } from "@nutui/icons-vue-taro";

const formFakeData = ref([
  {
    type: "text",
    key: "name",
    label: "姓名",
    value: "",
  },
  {
    type: "tel",
    label: "⼿机号",
    key: "tel",
    value: "",
  },
  {
    type: "email",
    label: "邮箱",
    key: "email",
    value: "",
  },
  {
    type: "singleSelect",
    key: "industry",
    label: "行业",
    options: ["⼯业4.0", "航空航天"],
    value: "",
  },
]);
const themeVars = reactive({
  formItemErrorLineColor: "#008000",
});

const dynamicRefForm = ref<any>(null);
const dynamicForm = {
  methods: {
    submit() {
      dynamicRefForm.value.validate().then(() => {
        console.log("success", formFakeData.value);
      });
    },
  },
};
const page = {
  state: reactive({
    msg: "toast",
    type: "text",
    show: false,
  }),
  methods: {
    openToast: (msg: string) => {
      page.state.show = true;
      page.state.msg = msg;
    },
    onClosed: () => console.log("closed"),
  },
};
const handleClickSingleSelect = ({ value, options }, index) => {
  show.value = true;
  showSelectIndex.value = index;
  columns.value = options.map((item) => {
    return { text: item, value: item };
  });
};
const show = ref(false);
const showSelectIndex = ref();
const columns = ref([]);
const popupConfirm = ({ selectedOptions }) => {
  formFakeData.value[showSelectIndex.value].value = selectedOptions
    .map((val: any) => val.text)
    .join(",");
  show.value = false;
};
</script>

<style lang="scss">
.index {
  background-color: #f1f6f5;
  height: 100%;
  .tag {
    color: #9fa2a1;
    font-size: 30px;
  }
  .industry {
    display: flex;
    justify-content: flex-end;
  }
  .label {
    color: #aeb3ae;
  }
  .nut-cell-group__wrap {
    background-color: transparent !important;
    border-radius: 0;
    box-shadow: none;
  }
  .nut-cell {
    margin-bottom: 20px;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 5px;
      background-color: rgba(98, 98, 98, 0.5);
      border-bottom: 0;
    }
  }
  .content {
    height: calc(100vh - 200px);
    padding: 30px;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background-color: #ffffff;
    text-align: right;
    padding: 30px 30px;
    box-sizing: border-box;
  }
}
</style>
