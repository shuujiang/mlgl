<template>
	<div class="returned innercontent">
		<div>
			<div class="formAction">
				<div class="tableformitem">
					<span class="tableformitemlebel">资源名称：</span>
					<div class="tableformitemInput">
						<el-input placeholder="请输入资源名称" v-model="name"></el-input>
					</div>
				</div>
				<div class="tableformitem">
					<span class="tableformitemlebel">资源编码：</span>
					<div  class="tableformitemInput">
						<el-input placeholder="请输入资源编码" v-model="code"></el-input>
					</div>
				</div>
				<div class="tableformitem">
					<span class="tableformitemlebel">部门名称：</span>
					<div  class="tableformitemInput">
						<el-select v-model="departmentName" placeholder="请选择部门" style="width:100%;">
							<el-option v-for="(item, i) in departmentList" :key="item.value" :label="item.label" :value="i"></el-option>
						</el-select>
					</div>
				</div>
				<div class="tableformitem">
					<span class="tableformitemlebel">所属类目：</span>
					<div  class="tableformitemInput">
						<el-input placeholder="请输入所属类目" v-model="category"></el-input>
					</div>
				</div>
				<div class="tableformitemTime">
					<span class="tableformitemlebel">退回时间：</span>
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
				<el-table-column prop="directoryName" label="资源名称"></el-table-column>
				<el-table-column prop="categoryName" label="所属类目"></el-table-column>
				<el-table-column prop="directoryCode" label="资源编码"></el-table-column>
				<el-table-column prop="departmentName" label="提供部门"></el-table-column>
				<el-table-column prop="refundPeople" label="退回人"></el-table-column>
				<el-table-column prop="refundTime" label="退回时间"></el-table-column>
				<el-table-column prop="instructions" label="说明"></el-table-column>
				<el-table-column label="操作" width="80">
					<template slot-scope="scope">
						<el-button size="small" type="primary" @click="showDialog(8,scope.$index, scope.row)">查看</el-button>
						<!-- <el-button size="small" @click="showDialog(7,scope.$index, scope.row)">退回</el-button> -->
					</template>
				</el-table-column>
			</el-table>
			<div class="paging">
				<el-pagination :current-page="pagenumber" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="count" @current-change="handleCurrentChange">
				</el-pagination>
			</div>
		</div>
		<cateloglist-dialog></cateloglist-dialog>
	</div>
</template>
<script>
import CateloglistDialog from "../catelogcategorycomponents/cateloglistdialog"
export default {
	components:{
		CateloglistDialog
	},
	data() {
		return {
		name: "",
		code: "",
		departmentName:"",
		entryPeople:"",
		category: "",
		time1:"",
		time2:"",
		state:"",
		filterText: "",
		treedata: [],
		defaultProps: {
			children: "children",
			label: "label"
		},
		departmentList:[
			{label:"公路局"},
			{label:"运管局"}
		],
		tableData: [],
		currentData:[],
		pagenumber:1,
		pagesize:10,
		count:100
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
			this.currentData = this.tableData.filter(item => item.pid === val.pid);
		},
		//表格选择
		handleSelectionChange(val) {
			console.log(val);
		},
		//弹框
		showDialog(flag, index, obj) {
			this.$bus.emit("cateloglistdialog",{flag: flag, index: index, obj: obj});
		},
		//删除一条信息
		handleDelete(index, obj) {
			this.$confirm("是否删除该条信息?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
				this.tableData.splice(index, 1);
				this.$message({
					type: "success",
					message: "删除成功!"
				});
				})
				.catch(() => {
				this.$message({
					type: "info",
					message: "已取消删除"
				});
				});
		},
		handleCurrentChange(val) {
		this.pagenumber = val;
		}
	},
	created() {
		this.$axios.get("static/data/cateloglist.json").then(response => {
		const data = this.checkJSONType(response.data);
		this.treedata = data.treedata;
		this.tableData = data.tableData;
		this.currentData = this.tableData;
		});
	},
	watch: {
		filterText(val) {
		this.$refs.tree.filter(val);
		}
	}
};
</script>
<style>

</style>