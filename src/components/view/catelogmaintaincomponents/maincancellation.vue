<template>
	<div class="maincancellation innercontent">
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
					<span class="tableformitemlebel">注销人：</span>
					<div  class="tableformitemInput">
						<el-input placeholder="请输入注销人" v-model="entryPeople"></el-input>
					</div>
				</div>
				<div class="tableformitemTime">
					<span class="tableformitemlebel">注销时间：</span>
					<div  class="tableformitemInput">
						<el-date-picker style="width:100%;" v-model="time1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
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
			<el-table :data="currentData" border @selection-change="handleSelectionChange">
				<el-table-column prop="directoryName" label="资源名称"></el-table-column>
				<el-table-column prop="directoryCode" label="资源编码"></el-table-column>
				<el-table-column prop="releaseTime" label="发布时间"></el-table-column>
				<el-table-column prop="releasePeople" label="发布人"></el-table-column>
				<el-table-column prop="cancellationTime" label="注销时间"></el-table-column>
				<el-table-column prop="cancellationPeople" label="注销人"></el-table-column>
				<el-table-column prop="cancellationwhy" label="注销原因"></el-table-column>
				<el-table-column label="操作" width="80">
					<template slot-scope="scope">
						<el-button size="small" type="primary" @click="showDialog(1,scope.$index, scope.row)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="paging">
				<el-pagination :current-page="pagenumber" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="count" @current-change="handleCurrentChange">
				</el-pagination>
			</div>
		</div>
		<cancellation-dialog></cancellation-dialog>
	</div>
</template>
<script>
import CancellationDialog from "../catelogcategorycomponents/cancellationdialog"
export default {
	components:{
		CancellationDialog
	},
	data() {
		return {
		name: "",
		code: "",
		entryPeople:"",
		category: "",
		time1:"",
		time2:"",
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
			this.$bus.emit("cancellationdialog",{flag: flag, index: index, obj: obj});
		},
		handleReply(index, obj){
			this.$confirm("是否恢复?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "success"
			}).then(() => {
				this.tableData.splice(index, 1);
				this.$message({
					type: "success",
					message: "恢复成功!"
				});
			}).catch(() => {
				this.$message({
					type: "info",
					message: "已取消恢复"
				});
			});
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