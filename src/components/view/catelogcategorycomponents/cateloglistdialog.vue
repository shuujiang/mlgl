<template>
    <div class="cateloglistdialog">
        <el-dialog :title="title" :visible.sync="dialogVisible" width="1000px" :top="top"> 
            <div style="height:600px; overflow:auto;">
                <!-- <a href="#aaa">发布</a>    -->
                <div id="basicInformation">
                    <p class="dialogTitle">基本信息</p>
                    <div class="line">
                        <div class="doubleRow">
                            <div class="itemtitle">类目名称：</div>
                            <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                                <el-cascader :options="categoryList" v-model="form.categoryCode" :disabled="!neccessaryType" placeholder="请选择类目名称" style="width:100%;"></el-cascader>
                            </div>
                        </div>
                        <div class="doubleRow">
                            <div class="itemtitle">类目代码：</div>
                            <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                                <el-input placeholder="" :disabled="true" v-model="form.categoryCode1"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="line">
                        <div class="doubleRow">
                            <div class="itemtitle">目录代码：</div>
                            <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                                <el-input placeholder="请输入目录代码" :disabled="!neccessaryType" v-model="form.directoryCode"></el-input>
                            </div>
                        </div>
                        <div class="doubleRow">
                            <div class="itemtitle">目录名称：</div>
                            <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                                <el-input placeholder="请输入目录名称" :disabled="!neccessaryType" v-model="form.directoryName"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="line">
                        <div class="doubleRow">
                            <div class="itemtitle">关键字：</div>
                            <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                                <el-input placeholder="请输入关键字" :disabled="!neccessaryType" v-model="form.keywords"></el-input>
                            </div>
                        </div>
                        <div class="doubleRow">
                            <div class="itemtitle">更新周期：</div>
                            <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                                <el-select v-model="form.updateCycle" :disabled="!neccessaryType" placeholder="请选择更新周期" style="width:100%;">
                                    <el-option v-for="(item, i) in updateCycleList" :key="item.value" :label="item.label" :value="i"></el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="line">
                        <div :class="{doubleRow:true,'determine': !neccessaryType}">
                            <div class="itemtitle">数据项选择：</div>
                            <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                                <div class="dataItem">
                                    <el-input placeholder="请选择数据项" :disabled="!neccessaryType" v-model="form.dataItemName"></el-input>
                                </div>
                                <el-button @click="datalistdialog">选择</el-button>
                            </div>
                        </div>
                        <div class="doubleRow">
                            <div class="itemtitle">是否开放：</div>
                            <div :class="{itemframe: true, 'neccessary': neccessaryType}">
                                <el-radio-group v-model="form.openType" :disabled="!neccessaryType">
                                    <el-radio :label="true">是</el-radio>
                                    <el-radio :label="false">否</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                    <div class="line">
                        <div class="itemtitle">描述说明：</div>
                        <div :class="{notNecessary: true, 'neccessary': neccessaryType}">
                            <el-input type="textarea" :disabled="!neccessaryType" v-model="form.instructions" :rows="rowsNum"></el-input>
                        </div>
                    </div>
                    <div class="line">
                        <div class="itemtitle">备注：</div>
                        <div class="notNecessary">
                            <el-input type="textarea" :disabled="!neccessaryType" v-model="form.remark" :rows="rowsNum"></el-input>
                        </div>
                    </div>
                </div>
                <div id="dataItem" :class="{'determine': neccessaryType}">
                    <p class="dialogTitle">数据项信息</p>                
                    <el-table :data="datalist" border>
                        <el-table-column type="index" label="编号" width="55"></el-table-column>
                        <el-table-column prop="shortname" label="短名"></el-table-column>
                        <el-table-column prop="enName" label="英文名"></el-table-column>
                        <el-table-column prop="name" label="中文名"></el-table-column>
                        <el-table-column prop="dataType" label="数据格式"></el-table-column>
                        <el-table-column prop="shared" label="共享属性"></el-table-column>
                        <el-table-column prop="openType" label="开放属性"></el-table-column>
                        <el-table-column prop="searchTtem" label="是否搜索项">
                            <template slot-scope="scope">
                                <div :class="{gou:scope.row.searchTtem, cuo: !scope.row.searchTtem}">&nbsp;</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="instructions" label="说明"></el-table-column>
                    </el-table>
                </div>
                <div id="auditInformation">
                    <div :class="{'determine': audit}">
                        <p class="dialogTitle">审核信息</p>
                        <div class="line">
                            <div class="doubleRow">
                                <div class="itemtitle">申请人：</div>
                                <div class="itemframe">
                                    <el-input disabled v-model="form.applicant"></el-input>
                                </div>
                            </div>
                            <div class="doubleRow">
                                <div class="itemtitle">申请时间：</div>
                                <div class="itemframe">
                                    <el-input disabled v-model="form.applicantTime"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="line">
                            <div class="doubleRow">
                                <div class="itemtitle">申请部门：</div>
                                <div class="itemframe">
                                    <el-input disabled v-model="form.departmentName"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="line">
                            <div class="doubleRow">
                                <div class="itemtitle">是否抄送</div>
                                <div class="itemframe">
                                    <el-radio-group v-model="form.ccType">
                                        <el-radio :label="0">是</el-radio>
                                        <el-radio :label="1">否</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="doubleRow">
                                <div class="itemtitle">抄送人：</div>
                                <div class="itemframe">
                                    <el-select v-model="form.ccPeople" placeholder="请选择抄送人" style="width:100%;">
                                        <el-option v-for="(item, i) in ccPeopleList" :key="item.value" :label="item.label" :value="i"></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="line">
                            <div class="itemtitle">审核意见：</div>
                            <div :class="{notNecessary: true, 'neccessary': neccessaryType}">
                                <el-input type="textarea" v-model="form.auditOpinion" :rows="2"></el-input>
                            </div>
                        </div>
                    </div>
                    <div :class="{'determine': approved}">
                        <p class="dialogTitle">审核信息</p>
                        <el-table :data="directoryObjlist" border>
                            <el-table-column type="index" label="序号" width="55"></el-table-column>
                            <el-table-column prop="reviewer" label="审核人"></el-table-column>
                            <el-table-column prop="directoryName" label="所属类目"></el-table-column>
                            <el-table-column prop="reviewTime" label="审核时间"></el-table-column>
                            <el-table-column prop="reviewStatus" label="审核状态"></el-table-column>
                            <el-table-column prop="auditOpinion" label="审核意见"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div id="releaseInformation">
                        <div :class="{'determine': release}">
                        <p class="dialogTitle">发布信息</p>
                        <div class="line">
                            <div class="itemtitle">发布意见：</div>
                            <div class="notNecessary">
                                <el-input type="textarea" v-model="form.publishOpinion" :rows="2"></el-input>
                            </div>
                        </div>
                    </div>
                    <div :class="{'determine': published}">
                        <p class="dialogTitle">发布信息</p>
                        <el-table :data="directoryObjlist" border style="width: 100%">
                            <el-table-column type="index" label="序号" width="55"></el-table-column>
                            <el-table-column prop="releasePeople" label="发布人"></el-table-column>
                            <el-table-column prop="directoryName" label="所属类目"></el-table-column>
                            <el-table-column prop="releaseTime" label="发布时间"></el-table-column>
                            <el-table-column prop="releaseStatus" label="状态"></el-table-column>
                            <el-table-column prop="publishOpinion" label="发布意见"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div id="refundInformation">
                    <div :class="{'determine': refund}">
                        <p class="dialogTitle">退回信息</p>
                        <div class="line">
                            <div class="itemtitle">退回原因：</div>
                            <div class="notNecessary">
                                <el-input type="textarea" v-model="form.publishOpinion" :rows="2"></el-input>
                            </div>
                        </div>
                    </div>
                    <div :class="{'determine': retired}">
                        <p class="dialogTitle">退回信息</p>
                        <el-table :data="directoryObjlist" border style="width: 100%">
                            <el-table-column type="index" label="序号" width="55"></el-table-column>
                            <el-table-column prop="refundPeople" label="退回人"></el-table-column>
                            <el-table-column prop="directoryName" label="所属类目"></el-table-column>
                            <el-table-column prop="refundTime" label="退回时间"></el-table-column>
                            <el-table-column prop="refundStatus" label="状态"></el-table-column>
                            <el-table-column prop="publishOpinion" label="退回意见"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <span><el-button @click="dialogVisible = false">关 闭</el-button></span>
                <span :class="{'determine': !neccessaryType}"><el-button type="success" @click="dialogVisible = false">提 交</el-button></span>
                <span :class="{'determine': !neccessaryType}"><el-button type="primary" @click="dialogVisible = false">保 存</el-button></span>
                <span :class="{'determine': audit}"><el-button type="primary" @click="dialogVisible = false">审核不通过</el-button></span>
                <span :class="{'determine': audit}"><el-button type="primary" @click="dialogVisible = false">审核通过</el-button></span>
                <span :class="{'determine': release}"><el-button type="primary" @click="dialogVisible = false">发 布</el-button></span>
                <span :class="{'determine': refund}"><el-button type="primary" @click="dialogVisible = false">退 回</el-button></span>
            </span>
        </el-dialog>
        <datalist-dialog></datalist-dialog>
    </div>
</template>
<script>
import DatalistDialog from "./datalistdialog"
export default {
    components:{
        DatalistDialog
    },
    data() {
        return {
            top:"15vh",
            title: "新建资源目录",
            dialogVisible: false,
            neccessaryType: true,
            approved:true,
            audit:true,
            release:true,
            published:true,
            refund:true,
            retired:true,
            rowsNum:4,
            options:[],
            updateCycleList:[
                {label:"实时"},
                {label:"每日"},
                {label:"每周"},
                {label:"每月"},
                {label:"每季度"},
                {label:"每年"},
                {label:"不定期更新"}
            ],
            ccPeopleList:[
                {label:"张三"},
                {label:"李四"}
            ],
            categoryList:[],
            datalist:[],
            directoryObjlist:[],
            form: {
                dataItemName:""
            }
        };
    },
    methods: {
        datalistdialog() {
            this.$bus.emit("datalistdialog");
        }
    },
    mounted() {
        this.$bus.on(
        "cateloglistdialog",
        function(val) {
            this.$axios.get("static/data/catelogcategory.json").then(response => {
                const data = this.checkJSONType(response.data);
                this.categoryList = data.treedata;
                // this.categoryList = data.treedata;
            });
            this.$axios.get("static/data/dataitemlist.json").then(response => {
                const data = this.checkJSONType(response.data);
                this.datalist = data.tableData;
            });
            this.neccessaryType = false;
            this.audit = true;
            this.approved = true;
            this.release = true;
            this.published = true;
            this.refund = true;
            this.retired = true;
            if (val.flag === 0) {
                // for(let i in this.form) {
                //     this.form[i] = "";
                // }
                this.form = {dataItemName:"",categoryCode1:""},
                this.title = "新建资源目录";
                this.neccessaryType = true;
                this.rowsNum = 4;
                this.top = "15vh";
            } else if (val.flag === 1){
                this.form = val.obj;
                this.form.categoryCode1 = this.form.categoryCode[this.form.categoryCode.length-1];
                this.title = "查看资源目录";
                this.rowsNum = 1;
                this.top = "15vh";            
            } else if (val.flag === 2){
                this.form = val.obj;
                this.form.categoryCode1 = this.form.categoryCode[this.form.categoryCode.length-1];
                this.title = "编辑资源目录";
                this.neccessaryType = true;
                this.rowsNum = 4;
                this.top = "15vh";            
            }else if(val.flag === 3){
                this.form = val.obj;
                this.form.categoryCode1 = this.form.categoryCode[this.form.categoryCode.length-1];
                this.title = "审核资源目录";
                this.rowsNum = 1;
                this.audit = false;
                this.top = "10vh";  
            }else if(val.flag === 4){
                this.form = val.obj;
                this.form.categoryCode1 = this.form.categoryCode[this.form.categoryCode.length-1];
                this.title = "查看资源目录";
                this.rowsNum = 1;
                this.approved = false;
                this.top = "10vh";  
            }else if(val.flag === 5){
                this.form = val.obj;
                this.form.categoryCode1 = this.form.categoryCode[this.form.categoryCode.length-1];
                this.title = "发布资源目录";
                this.rowsNum = 1;
                this.approved = false;
                this.release = false;
                this.top = "10vh";  
            }else if(val.flag === 6){
                this.form = val.obj;
                this.form.categoryCode1 = this.form.categoryCode[this.form.categoryCode.length-1];
                this.title = "查看资源目录";
                this.rowsNum = 1;
                this.approved = false;
                this.published = false;
                this.top = "10vh";
            }else if(val.flag === 7){
                this.form = val.obj;
                this.form.categoryCode1 = this.form.categoryCode[this.form.categoryCode.length-1];
                this.title = "退回资源目录";
                this.rowsNum = 1;
                this.approved = false;
                this.published = false;
                this.refund = false;
                this.top = "10vh";
            }else if(val.flag === 8){
                this.form = val.obj;
                this.form.categoryCode1 = this.form.categoryCode[this.form.categoryCode.length-1];
                this.title = "查看资源目录";
                this.rowsNum = 1;
                this.approved = false;
                this.published = false;
                this.retired = false;   
                this.top = "10vh";
            }
            this.directoryObjlist = [val.obj];
            this.dialogVisible = true;
        }.bind(this)
        );
    },
    beforeDestroy() {
        this.$bus.off("cateloglistdialog");
    }
};
</script>
<style lang="stylus">
    
</style>
