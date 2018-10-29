<template>
    <div class="navigationdialog">
        <el-dialog :title="title" :visible.sync="dialogVisible" width="600px">
            <div class="line">
                <div class="itemtitle">上级导航：</div>
                <div :class="{itemframebackup: true, 'neccessary': neccessaryType}">
                    <el-input placeholder="请选择上级导航" :disabled="!neccessaryType" v-model="form.superiorNgName" style="width:325px;"></el-input>
                    <el-button type="primary" :disabled="!neccessaryType" @click="showDialog">选择</el-button>                    
                </div>
            </div>
            <div class="line">
                <div class="itemtitle">导航名称：</div>
                <div :class="{itemframebackup: true, 'neccessary': neccessaryType}">
                    <el-input placeholder="请输入导航名称" :disabled="!neccessaryType" v-model="form.navigationName"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <span><el-button @click="dialogVisible = false">关 闭</el-button></span>
                <span :class="{'determine': !neccessaryType}"><el-button type="primary" @click="dialogVisible = false">保 存</el-button></span>
            </span>
        </el-dialog>
         <navigationselect-dialog></navigationselect-dialog>
    </div>
</template>
<script>
import NavigationselectDialog from "./navigationselectdialog"
export default {
    components:{
        NavigationselectDialog
    },
    data() {
        return {
            title: "新增导航",
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
    methods: {
        //弹框
        showDialog(flag, index, obj) {
            this.$bus.emit("navigationselectdialog",{flag: flag, index: index, obj: obj});
        }
    },
    mounted() {
        this.$bus.on(
        "navigationdialog",
        function(val) {
            if (val.flag === 0) {
                for(let i in this.form) {
                    this.form[i] = "";
                }
                this.title = "新增导航";
                this.neccessaryType = true;
            } else if (val.flag === 1){
                this.form = val.obj;
                this.title = "修改导航";
                this.neccessaryType = true;
            } else if (val.flag === 2){
                this.form = val.obj;
                this.title = "查看导航";
                this.neccessaryType = false;
            }
            this.dialogVisible = true;
        }.bind(this)
        );
    },
    beforeDestroy() {
        this.$bus.off("navigationdialog");
    }
};
</script>
<style lang="stylus">
    
</style>
