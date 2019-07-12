/**
 * msgbox 确认弹出框调用
 * @vm
 * @title 标题
 * @text 内容
 * @smallText 内容下的文本
 * @isClose 是否显示右上关闭按钮 | 默认 false
 * @callback beforeClose 确认按钮按下时回调
 * @success 确认按钮按下后回调
 * @cancel 取消按钮按下后回调
 * @smallStyle 内容下的文本的样式
 */

/**
 * 使用示例
 msgbox(vm, vm.title, vm.text, vm.small, true,
 (action, instance, done) => {
					instance.confirmButtonLoading = true;
					instance.confirmButtonText = '执行中...';
					setTimeout(() => {
						done();
						setTimeout(() => {
							instance.confirmButtonLoading = false;
						}, 300);
					}, 3000);
				},
 (action) => {
					vm.$message({
						type: 'info',
						message: 'action: ' + action
					});
				});
 */

function msgbox(
	vm: any,
	title: string = '消息',
	text: string,
	smallText: string = '',
	isClose: boolean = false,
	callback?: any,
	success?: any,
	cancel?: any,
	smallStyle: string = 'color: #cacaca',
) {
	const h = vm.$createElement;
	vm.$msgbox({
		title: title,
		message: h('div', null, [
			h('p', null, text),
			h('span', {style: smallStyle}, smallText)
		]),
		// distinguishCancelAndClose: false,
		closeOnClickModal: false,
		closeOnPressEscape: false,
		showClose: isClose,
		showCancelButton: true,
		cancelButtonText: '取消',
		confirmButtonText: '移除',
		cancelButtonClass: 'msgbox-btn msgbox-float-r',
		confirmButtonClass: 'msgbox-btn msgbox-mr20',
		beforeClose: (action: any, instance: any, done: any) => {
			if (action === 'confirm') {
				if (typeof callback === 'function') {
					callback(action, instance, done);
				} else {
					throw new class implements Error {
						public message: string = 'callback is not function';
						public name: string = 'beforeClose';
					};
				}
			} else {
				done();
			}
		}
	}).then((action: any): void => {
		if (typeof success === 'function') {
			success(action);
		} else {
			throw new class implements Error {
				public message: string = 'callback is not function';
				public name: string = 'confirm';
			};
		}
	}).catch((action: any) => {
		if (typeof cancel === 'function') {
			cancel(action);
		} else {
			throw new class implements Error {
				public message: string = 'callback is not function';
				public name: string = 'cancel';
			};
		}
	});
}


export default msgbox;
