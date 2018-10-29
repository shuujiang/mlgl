<template>
    <div class="dataitemlistdialog">
        <el-dialog :title="title" :visible.sync="dialogVisible" width="1000px">
            <div class="line">
                <div class="doubleRow">
                    <div class="itemtitle">代码：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                            <el-input placeholder="请输入代码" :disabled="!neccessaryType" v-model="form.code"></el-input>
                        </div>
                    </div>
                </div>
                <div class="doubleRow">
                    <div class="itemtitle">中文名：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <el-input placeholder="请输入中文名" :disabled="!neccessaryType" v-model="form.name"></el-input>
                    </div>
                </div>
            </div>
            <div class="line">
                <div class="doubleRow">
                    <div class="itemtitle">英文名：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <el-input placeholder="请输入英文名" :disabled="!neccessaryType" v-model="form.enName"></el-input>
                    </div>
                </div>
                <div class="doubleRow">
                    <div class="itemtitle">短名：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <el-input placeholder="请输入短名" :disabled="!neccessaryType" v-model="form.shortname"></el-input>
                    </div>
                </div>
            </div>
            <div class="line">
                <div class="doubleRow">
                    <div class="itemtitle">数据类型：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <el-select v-model="form.dataType" :disabled="!neccessaryType" placeholder="请选择数据类型" style="width:100%;">
                            <el-option v-for="(item, i) in dataTypeList" :key="item.value" :label="item.label" :value="i"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="doubleRow">
                    <div class="itemtitle">数据长度：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <el-input placeholder="请输入数据长度" :disabled="!neccessaryType" v-model="form.dataLength"></el-input>
                    </div>
                </div>
            </div>
            <div class="line">
                <div :class="{doubleRow:true,'determine': !neccessaryType}">
                    <div class="itemtitle">值域：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <el-input placeholder="请输入值域" :disabled="!neccessaryType" v-model="form.domain"></el-input>
                    </div>
                </div>
                <div :class="{doubleRow:true,'determine': !neccessaryType}">
                    <div class="itemtitle">描述：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <el-input placeholder="请输入描述" :disabled="!neccessaryType" v-model="form.instructions"></el-input>
                    </div>
                </div>
            </div>
            <div class="line">
                <div class="doubleRow">
                    <div class="itemtitle">共享属性：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <el-select v-model="form.shared" :disabled="!neccessaryType" placeholder="请选择共享属性" style="width:100%;">
                            <el-option v-for="(item, i) in sharedList" :key="item.value" :label="item.label" :value="i"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="doubleRow">
                    <div class="itemtitle">开放属性：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <el-radio-group v-model="form.openType" :disabled="!neccessaryType">
                            <el-radio :label="0">是</el-radio>
                            <el-radio :label="1">否</el-radio>
                        </el-radio-group>
                    </div>
                </div>
            </div>
            <div class="line">
                <div class="doubleRow">
                    <div class="itemtitle">更新周期：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <el-select v-model="form.updateCycle" :disabled="!neccessaryType" placeholder="请选择更新周期" style="width:100%;">
                            <el-option v-for="(item, i) in updateCycleList" :key="item.value" :label="item.label" :value="i"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="doubleRow">
                    <div class="itemtitle">采用标准：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <el-input placeholder="请输入标准" :disabled="!neccessaryType" v-model="form.standard"></el-input>
                    </div>
                </div>
            </div>
            <div class="line">
                <div :class="{doubleRow:true,'determine': !neccessaryType}">
                    <div class="itemtitle">元数据：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <el-select v-model="form.metadata" :disabled="!neccessaryType" placeholder="请选择元数据" style="width:100%;">
                            <el-option v-for="(item, i) in metadataList" :key="item.value" :label="item.label" :value="i"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <span><el-button @click="dialogVisible = false">关 闭</el-button></span>
                <span :class="{'determine': !neccessaryType}"><el-button type="primary" @click="dialogVisible = false">确 定</el-button></span>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
      title: "新建资源目录",
      dialogVisible: false,
      neccessaryType: true,
      updateCycleList:[
        {label:"实时"},
        {label:"每日"},
        {label:"每周"},
        {label:"每月"},
        {label:"每季度"},
        {label:"每年"},
        {label:"不定期更新"}
      ],
      dataTypeList:[],
      sharedList:[{label:"无条件共享"},{label:"有条件共享"},{label:"不予共享"}],
      metadataList:[],      
      form: {
        parentcode: "",
        parentname: "",
        code: "",
        name: "",
        desc: "",
        remark: ""
      }
    };
  },
  methods: {},
  mounted() {
    this.$bus.on(
      "dataitemlistdialog",
      function(val) {
        if (val.flag === 0) {
            for(let i in this.form) {
                this.form[i] = "";
            }
            this.title = "新建资源目录";
            this.neccessaryType = true;
        } else if (val.flag === 1){
            this.form = val.obj;
            this.title = "查看资源目录";
            this.neccessaryType = false;
        } else if (val.flag === 2){
            this.form = val.obj;
            this.title = "编辑资源目录";
            this.neccessaryType = true;            
        }
        this.dialogVisible = true;
      }.bind(this)
    );
  },
  beforeDestroy() {
    this.$bus.off("dataitemlistdialog");
  }
};
</script>
<style lang="stylus">
    
</style>
