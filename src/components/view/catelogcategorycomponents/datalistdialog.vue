<template>
    <div class="datadialog">
        <el-dialog :title="title" :visible.sync="dialogVisible" width="1000px">
            <div class="formAction" style="margin-top:30px;">
                <div class="tableformitem">
                    <span class="tableformitemlebel">名称：</span>
                    <div class="tableformitemInput">
                        <el-input placeholder="请输入部门名称" v-model="name"></el-input>
                    </div>
                </div>
                <div class="tableformitem">
                    <span class="tableformitemlebel">编码：</span>
                    <div  class="tableformitemInput">
                        <el-input placeholder="请输入部门名称" v-model="code"></el-input>
                    </div>
                </div>
                <div class="tableformitem">
                    <span class="tableformitemlebel">目录代码：</span>
                    <div  class="tableformitemInput">
                        <el-input placeholder="请输入部门名称" v-model="directoryCode"></el-input>
                    </div>
                </div>
            </div>
            <div class="formAction">
                <div class="actionButtons">
                <el-button type="primary">查询</el-button>
                </div>
                <div class="actionButtons">
                    <el-button type="primary">导出</el-button>
                </div>
            </div>
            <el-table :data="datalist" border>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="code" label="编码"></el-table-column>
                <el-table-column prop="departmentName" label="提供部门"></el-table-column>
                <el-table-column prop="shortname" label="短名"></el-table-column>
                <el-table-column prop="directoryName" label="所属目录"></el-table-column>
                <el-table-column prop="instructions" label="说明"></el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button size="small" @click="showDialog(1,scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <span><el-button @click="dialogVisible = false">取 消</el-button></span>
                <span><el-button type="primary" @click="dialogVisible = false">确 定</el-button></span>
            </span>
        </el-dialog>
        <dataitemlist-dialog></dataitemlist-dialog>
    </div>
</template>
<script>
import DataitemlistDialog from "./dataitemlistdialog"
export default {
components:{
    DataitemlistDialog
  },
  data() {
    return {
        title:"",
        name:"",
        code:"",
        directoryCode:"",
        dialogVisible:false,
      datalist:[]
    };
  },
  methods: {
      //弹框
    showDialog(flag, index, obj) {
      this.$bus.emit("dataitemlistdialog",{flag: flag, obj: obj});
    },
  },
  mounted() {
    this.$bus.on(
      "datalistdialog",
      function(val) {
        // this.$axios.get("static/data/catelogcategory.json").then(response => {
        //     const data = this.checkJSONType(response.data);
        //     this.categoryList = data.treedata;
        // });
        this.$axios.get("static/data/dataitemlist.json").then(response => {
            const data = this.checkJSONType(response.data);
            this.datalist = data.tableData;
        });
        // if (val.flag === 0) {
        //     // for(let i in this.form) {
        //     //     this.form[i] = "";
        //     // }
        //     this.form = {dataItemName:"",categoryCode1:""},
        //     this.title = "新建资源目录";
        //     this.neccessaryType = true;
        //     this.rowsNum = 4;
        // } else if (val.flag === 1){
        //     this.form = val.obj;
        //     this.form.categoryCode1 = this.form.categoryCode[this.form.categoryCode.length-1];
        //     this.title = "查看资源目录";
        //     this.rowsNum = 1;
        //     this.neccessaryType = false;
        // } else if (val.flag === 2){
        //     this.form = val.obj;
        //     this.form.categoryCode1 = this.form.categoryCode[this.form.categoryCode.length-1];
        //     this.title = "编辑资源目录";
        //     this.neccessaryType = true;
        //     this.rowsNum = 4;           
        // }
        this.dialogVisible = true;
      }.bind(this)
    );
  },
  beforeDestroy() {
    this.$bus.off("datalistdialog");
  }
};
</script>