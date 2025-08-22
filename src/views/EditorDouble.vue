<<template>
  <div id="editor-double"></div>
</template>

<script lang="ts" setup>
import localforage from 'localforage';
import { onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import editorConsoleInstance from '../editor/console';
import {
  addCommandSave,
  addContainer,
  addEditorIntoManageList,
  createEditorContainer,
  createEditorInstance,
  createEditorModel,
  disposeEditorList
} from '../editor/editor';
import { processContent } from '../transform';
import { EnumTools } from '@/types';

const codeSize = `计算字符串所占的内存字节数，使用UTF-8的编码方式计算`;
const code1 = ``;
const code2 = ``;
let model1 = createEditorModel(code1, "javascript");
let model2 = createEditorModel(code2, "javascript");
const $container1 = createEditorContainer();
const $container2 = createEditorContainer();
const editor1 = createEditorInstance($container1, model1);
const editor2 = createEditorInstance($container2, model2, { readOnly: true }); // 第二个编辑器为只读

const route = useRoute();

async function save() {
  const code1 = model1.getValue();
  const key = `code-tools-${String(route.name)}`;
  await localforage.setItem(key, code1)
  editorConsoleInstance.addConsole("\t[INFO]\t" + "Save Success")
}

async function fetch() {
  const key = `code-tools-${String(route.name)}`;
  await localforage.getItem(key).then((value) => {

    
      model1 = createEditorModel('', 'javascript');
      editor1.setModel(model1)
      model2 = createEditorModel('', 'javascript');
      editor2.setModel(model2)
    
  
    
    if (route.name == 'text-size') {
      model1.setValue(value as string || codeSize)
    }
    if (route.name == 'url-parse') {
      model1.setValue(value as string || window.location.href)
    }
  })
  editorConsoleInstance.addConsole("\t[INFO]\t" + "Fetch Success")
}

addCommandSave(editor1, async () => {
  save()
})

onMounted(async () => {
  addEditorIntoManageList(editor1);
  addEditorIntoManageList(editor2);
  addContainer(document.getElementById("editor-double") as HTMLElement, $container1);
  addContainer(document.getElementById("editor-double") as HTMLElement, $container2);
  await fetch()
});

watch(route, async () => {
  await fetch()
});

onUnmounted(() => {
  disposeEditorList()
});

async function excute() {
  const value1 = editor1.getValue();
  const type = route.name as EnumTools; // 默认类型为 text-size
  try {
    const [value, flag] = await processContent(value1, type);
    model2.setValue(value);
    if (flag === "unrealized") {
      editorConsoleInstance.addConsole("\t[WARN]\t" + "Format Unrealized");
    }
    if (flag === "success") {
      editorConsoleInstance.addConsole("\t[INFO]\t" + "Format Success");
    }
  } catch (error: any) {
    editor2.setValue("");
    editorConsoleInstance.addConsole("\t[Error]\t" + error.message);
  }
}

editor1.onDidChangeModelContent(() => {
  excute();
});
</script>

<style scoped>
#editor-double {
  width: 100%;
  height: 100%;
  display: flex;
}

</style>

<style>
#editor-double .container {
  width: 50%;
  height: 100%;
}
</style>
