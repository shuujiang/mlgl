<template>
    <div class="backupdialog">
        <el-dialog :title="title" :visible.sync="dialogVisible" width="600px">
            <div class="line">
                <div class="itemtitle">备份目录：</div>
                <div :class="{itemframebackup: true, 'neccessary': neccessaryType}">
                    <el-input disabled v-model="backup"></el-input>
                </div>
            </div>
            <div class="line">
                <div class="itemtitle">备份名称：</div>
                <div :class="{itemframebackup: true, 'neccessary': neccessaryType}">
                    <el-input placeholder="请输入备份名称" :disabled="!neccessaryType" v-model="form.backupName"></el-input>
                </div>
            </div>
            <div class="line">
                <div class="itemtitle">备注：</div>
                <div class="itemframebackup">
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
        title: "新增备份",
        backup:"所有目录",
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
      "backupdialog",
      function(val) {
        if (val.flag === 0) {
            for(let i in this.form) {
                this.form[i] = "";
            }
            this.title = "新增备份";
            this.neccessaryType = true;
        } else if (val.flag === 1){
            this.form = val.obj;
            this.title = "查看备份";
            this.neccessaryType = false;
        }
        this.dialogVisible = true;
      }.bind(this)
    );
  },
  beforeDestroy() {
    this.$bus.off("backupdialog");
  }
};
</script>
<style lang="stylus">
    
</style>
