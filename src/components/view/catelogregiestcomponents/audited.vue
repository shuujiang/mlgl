<template>
	<div class="audited innercontent">
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
					<span class="tableformitemlebel">所属类目：</span>
					<div  class="tableformitemInput">
						<el-input placeholder="请输入所属类目" v-model="category"></el-input>
					</div>
				</div>
				<div class="tableformitem">
					<span class="tableformitemlebel">审核人：</span>
					<div  class="tableformitemInput">
						<el-input placeholder="请输入审核人" v-model="entryPeople"></el-input>
					</div>
				</div>
				<div class="tableformitemTime">
					<span class="tableformitemlebel">申请时间：</span>
					<div  class="tableformitemInput">
						<el-date-picker style="width:100%;" v-model="time1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
					</div>
				</div>
				<div class="tableformitem">
					<span class="tableformitemlebel">状态：</span>
					<div  class="tableformitemInput">
						<el-select v-model="state" placeholder="请选择状态" clearable style="width:100%;">
							<el-option label="审核通过" value="0"></el-option>
							<el-option label="审核不通过" value="1"></el-option>
						</el-select>
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
				<el-table-column prop="directoryCode" label="资源编码"></el-table-column>
				<el-table-column prop="directoryName" label="所属类目"></el-table-column>
				<el-table-column prop="departmentName" label="提供部门"></el-table-column>
				<el-table-column prop="reviewer" label="审核人"></el-table-column>
				<el-table-column prop="reviewTime" label="审核时间"></el-table-column>
				<el-table-column prop="reviewStatus" label="审核状态"></el-table-column>
				<el-table-column prop="instructions" label="说明"></el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button size="small" type="primary" @click="showDialog(4,scope.$index, scope.row)">查看</el-button>
						<el-button size="small" type="primary" @click="handleSubmit(scope.$index, scope.row)">入库</el-button>
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
		// 入库
		handleSubmit(){
			this.$confirm("是否入库?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "success"
			}).then(() => {
				this.$message({
						type: "success",
						message: "提交成功!"
					});
				}).catch(() => {
				this.$message({
						type: "info",
						message: "已取消提交!"
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