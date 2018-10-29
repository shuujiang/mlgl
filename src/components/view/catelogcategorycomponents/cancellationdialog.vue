<template>
    <div class="cancellationdialog">
        <el-dialog :title="title" :visible.sync="dialogVisible" width="600px">
            <div class="line">
                <div class="itemtitle">注销资源：</div>
                <div :class="{itemframebackup: true, 'neccessary': neccessaryType}">
                    <el-input disabled v-model="form.directoryName"></el-input>
                </div>
            </div>
            <div class="line">
                <div class="itemtitle">注销原因：</div>
                <div :class="{itemframebackup: true, 'neccessary': neccessaryType}">
                    <el-input placeholder="请输入注销原因" :disabled="!neccessaryType" v-model="form.cancellationwhy"></el-input>
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
      title: "新增注销",
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
      "cancellationdialog",
      function(val) {
        if (val.flag === 0) {
            this.form = val.obj;
            this.title = "新增注销";
            this.neccessaryType = true;
        } else if (val.flag === 1){
            this.form = val.obj;
            this.title = "查看注销";
            this.neccessaryType = false;
        }
        this.dialogVisible = true;
      }.bind(this)
    );
  },
  beforeDestroy() {
    this.$bus.off("cancellationdialog");
  }
};
</script>
<style lang="stylus">
    
</style>
