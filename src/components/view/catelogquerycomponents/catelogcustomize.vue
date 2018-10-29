<template>
	<div class="catelogcustomize innercontent">
		<div class="lefttree">
			<p class="NGtitle">自定义导航</p>
			<div class="NGicon">
				<i class="add" @click="showNGDialog(0, '', '')"></i>
				<i class="editor" @click="showNGDialog(1, '', '')"></i>
				<i class="delete"></i>
			</div>
			<el-input placeholder="输入关键字过滤" v-model="filterText"></el-input>
			<el-tree class="filter-tree" :data="treedata" :props="defaultProps" :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick"></el-tree>
		</div>
		<div class="rightcontentbox">
			<div class="formAction">
				<div class="tableformitem">
					<span class="tableformitemlebel">导航名称：</span>
					<div class="tableformitemInput">
						<el-input placeholder="请输入导航名称" style="width:100%;" v-model="name"></el-input>
					</div>
				</div>
				<div class="tableformitem">
					<span class="tableformitemlebel">上级导航：</span>
					<div  class="tableformitemInput">
						<el-input placeholder="请输入上级导航名称"  style="width:100%;" v-model="code"></el-input>
					</div>
				</div>
				<div class="tableformitem">
					<span class="tableformitemlebel">录入人：</span>
					<div  class="tableformitemInput">
						<el-input placeholder="请输入录入人"  style="width:100%;" v-model="code"></el-input>
					</div>
				</div>
				<div class="tableformitemTime">
					<span class="tableformitemlebel">录入时间：</span>
					<div  class="tableformitemInput">
						<el-date-picker style="width:100%;" v-model="time1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
					</div>
				</div>
			</div>
			<div class="formAction">
				<div class="actionButtons">
					<el-button type="primary">查询</el-button>
				</div>
			</div>
			<el-table :data="currentData" border @selection-change="handleSelectionChange">
				<el-table-column prop="navigationName" label="导航名称"></el-table-column>
				<el-table-column prop="superiorNgName" label="上级导航名称"></el-table-column>
				<el-table-column prop="entryPeople" label="录入人"></el-table-column>
				<el-table-column prop="entryTime" label="录入时间"></el-table-column>
				<el-table-column label="操作" width="335">
					<template slot-scope="scope">
						<el-button size="small" type="primary" @click="showNGDialog(2, scope.$index, scope.row)">查看</el-button>
						<el-button size="small" type="primary" @click="ngtagaddFun">查看资源</el-button>
						<el-button size="small" type="primary" @click="showNGsetDialog(0,scope.$index, scope.row)">设置资源</el-button>
						<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="paging">
				<el-pagination :current-page="pagenumber" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="count" @current-change="handleCurrentChange">
				</el-pagination>
			</div>
		</div>
		<cateloglist-dialog></cateloglist-dialog>
		<navigation-dialog></navigation-dialog>
		<navigationset-dialog></navigationset-dialog>
	</div>
</template>
<script>
import CateloglistDialog from "../catelogcategorycomponents/cateloglistdialog"
import NavigationDialog from "../catelogcategorycomponents/navigationdialog"
import NavigationsetDialog from "../catelogcategorycomponents/navigationsetdialog"
export default {
	components:{
		CateloglistDialog,
		NavigationDialog,
		NavigationsetDialog
	},
	data() {
		return {
			name: "",
			code: "",
			filterText: "",
			treedata: [],
			defaultProps: {
				children: "children",
				label: "label"
			},
			tableData: [],
			currentData:[],
			editorObj:"",
			pagenumber:1,
			pagesize:10,
			count:100,
			time1:""
		};
	},
	methods: {
		//树状图过滤器
		filterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		//树状图点击
		handleNodeClick(val) {
			console.log(val, 107)
			this.editorObj = val;
			this.currentData = this.tableData.filter(item => item.superiorNgCode === val.value);
		},
		//表格选择
		handleSelectionChange(val) {
			console.log(val);
		},
		//弹框
		showDialog(flag, index, obj) {
			this.$bus.emit("cateloglistdialog",{flag: flag, index: index, obj: obj});
		},
		ngtagaddFun(){
			this.$router.push({path:'/catelogquery/catelogsearch',query:{info:'123'}});
		},
		showNGDialog(flag, index, obj){
			var val = this.editorObj.value;
			if(flag == 1){
				console.log(this.defaultProps, 119)
				this.tableData.forEach(function(item, i){
					if(item.navigationCode == val){
						obj = item;
						index = i;
					}
				});
			}
			this.$bus.emit("navigationdialog",{flag: flag, index: index, obj: obj});
		},
		showNGsetDialog(flag, index, obj){
			this.$bus.emit("navigationsetdialog",{flag: flag, index: index, obj: obj});
		},
		showNGsetDialog(flag, index, obj){
			this.$bus.emit("navigationsetdialog",{flag: flag, index: index, obj: obj});
		},
		//删除一条信息
		handleDelete(index, obj) {
			this.$confirm("是否删除该条信息?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				this.tableData.splice(index, 1);
				this.$message({
						type: "warning",
						message: "删除成功!"
					});
				}).catch(() => {
				this.$message({
						type: "info",
						message: "已取消删除"
					});
				});
		},
		handleCurrentChange(val) {
			this.pagenumber = val;
			this.currentData = this.tableData.slice((this.pagenumber-1)*10, this.pagenumber*10-1);
		}
	},
	created() {
		this.$axios.get("static/data/navigation.json").then(response => {
			const data = this.checkJSONType(response.data);
			this.treedata = data.treedata;
			this.tableData = data.tableData;
			this.currentData = this.tableData.slice((this.pagenumber-1)*10, this.pagenumber*10-1);
			
		});
	},
	watch: {
		filterText(val) {
			this.$refs.tree.filter(val);
		}
	}
};
</script>
<style lang="stylus">
.NGtitle
	text-align center
.NGicon
	// line-height  50px
	text-align center
	padding 5px 0
	i
		display inline-block
		width 35px
		height 35px
		margin 2%
		border-radius 5px
		cursor pointer
	.add
		background url(../../../../static/img/ngadd.png) 50% 50%/ 70% no-repeat
		background-color #409EFF
	.editor
		background url(../../../../static/img/ngeditor.png) 50% 50%/ 70% no-repeat
		background-color #409EFF
	.delete
		background url(../../../../static/img/ngdelete.png) 50% 50%/ 70% no-repeat
		background-color #409EFF
@media (max-width: 1440px)
	.NGicon
		i 
			width 30px
			height 30px
			margin 1%
@media (max-width: 1200px)
	.NGicon
		i 
			width 25px
			height 25px
</style>
