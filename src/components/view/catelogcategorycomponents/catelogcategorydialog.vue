<template>
    <div class="catelogcategorydialog">
        <el-dialog :title="title" :visible.sync="dialogVisible" width="1000px">
            <div class="line">
                <div class="doubleRow">
                    <div class="itemtitle">上级类目代码：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <el-input placeholder="请输入上级类目代码" :disabled="!neccessaryType" v-model="form.parentCode"></el-input>
                    </div>
                </div>
                <div class="doubleRow">
                    <div class="itemtitle">上级类目名称：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <el-input placeholder="请输入上级类目名称" :disabled="!neccessaryType" v-model="form.parentName"></el-input>
                    </div>
                </div>
            </div>
            <div class="line">
                <div class="doubleRow">
                    <div class="itemtitle">类目代码：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <el-input placeholder="请输入类目代码" :disabled="!neccessaryType" v-model="form.categoryCode"></el-input>
                    </div>
                </div>
                <div class="doubleRow">
                    <div class="itemtitle">类目名称：</div>
                    <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                        <el-input placeholder="请输入类目名称" :disabled="!neccessaryType" v-model="form.categoryName"></el-input>
                    </div>
                </div>
            </div>
            <div class="line">
                <div class="itemtitle">描述说明：</div>
                <div :class="{notNecessary: true, 'neccessary': neccessaryType}">
                    <el-input type="textarea" :disabled="!neccessaryType" v-model="form.instructions" :rows="4"></el-input>
                </div>
            </div>
            <div class="line">
                <div class="itemtitle">备注：</div>
                <div class="notNecessary">
                    <el-input type="textarea" :disabled="!neccessaryType" v-model="form.remark" :rows="4"></el-input>
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
      title: "新建类目",
      dialogVisible: false,
      neccessaryType: true,
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
      "catelogcategorydialog",
      function(val) {
        //   debugger;
        if (val.flag === 0) {
            for(let i in this.form) {
                this.form[i] = "";
            }
            this.title = "新建类目";
            this.neccessaryType = true;
        } else if (val.flag === 1){
            this.form = val.obj;
            this.title = "查看类目";
            this.neccessaryType = false;
        } else if (val.flag === 2){
            this.form = val.obj;
            this.title = "编辑类目";
            this.neccessaryType = true;            
        }
        this.dialogVisible = true;
      }.bind(this)
    );
  },
  beforeDestroy() {
    this.$bus.off("catelogcategorydialog");
  }
};
</script>
<style lang="stylus">
    
</style>
