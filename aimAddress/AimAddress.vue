<template>
	<div>
		<div v-if="size == 'mini'"
				 class="aim-wrap aim-address-left-item"
				 :class="{'error-border': isIpCheck}">
			<el-input class="aim-address-item"
								v-model="mini.ip1"
								ref="elInput1"
								maxlength="3"
								@input="handleInputChange($event, 1, mini)"
								@keyup.native="handleKeyDown($event, 1)"
								@blur="handleCodeMiniBlur"
								size="mini"></el-input>
			<span>.</span>
			<el-input class="aim-address-item"
								v-model="mini.ip2"
								ref="elInput2"
								maxlength="3"
								@input="handleInputChange($event, 2, mini)"
								@keyup.native="handleKeyDown($event, 2)"
								@keyup.native.delete="handleInputDelete(mini.ip2, 2)"
								@blur="handleCodeMiniBlur"
								size="mini"></el-input>
			<span>.</span>
			<el-input class="aim-address-item"
								v-model="mini.ip3"
								ref="elInput3"
								maxlength="3"
								@input="handleInputChange($event, 3, mini)"
								@keyup.native="handleKeyDown($event, 3)"
								@keyup.native.delete="handleInputDelete(mini.ip3, 3)"
								@blur="handleCodeMiniBlur"
								size="mini"></el-input>
			<span>.</span>
			<el-input class="aim-address-item"
								v-model="mini.ip4"
								ref="elInput4"
								maxlength="3"
								@input="handleInputChange($event, 2)"
								@keyup.native.delete="handleInputDelete(mini.ip4, 4)"
								@blur="handleCodeMiniBlur"
								size="mini"></el-input>
			<div class="aim-ip-error-wrap">
				<transition name="slide-fade">
					<div v-if="isIpCheck" class="aim-ip-error-text">{{ipText}}</div>
				</transition>
			</div>
		</div>
		<div v-else class="aim">
			<div class="aim-wrap aim-address-left-item"
					 :class="{'error-border': isIpCheck}">
				<el-input maxlength="3"
									v-model="aimAddress.ip1"
									class="aim-wrap-input"
									ref="elInput1"
									@input="handleInputChange($event, 1, aimAddress)"
									@keyup.native="handleKeyDown($event, 1, aimAddress.ip1)"
									size="mini"
									@blur="handleIpAimAddressBlur"></el-input>
				<span>.</span>
				<el-input maxlength="3"
									v-model="aimAddress.ip2"
									class="aim-wrap-input"
									ref="elInput2"
									@input="handleInputChange($event, 2, aimAddress)"
									@keyup.native="handleKeyDown($event, 2)"
									@keyup.native.delete="handleInputDelete(aimAddress.ip2, 2)"
									size="mini"
									@blur="handleIpAimAddressBlur"></el-input>
				<span>.</span>
				<el-input maxlength="3"
									v-model="aimAddress.ip3"
									class="aim-wrap-input"
									ref="elInput3"
									@input="handleInputChange($event, 3, aimAddress)"
									@keyup.native="handleKeyDown($event, 3)"
									@keyup.native.delete="handleInputDelete(aimAddress.ip3, 3)"
									size="mini"
									@blur="handleIpAimAddressBlur"></el-input>
				<span>.</span>
				<el-input maxlength="3"
									v-model="aimAddress.ip4"
									class="aim-wrap-input"
									ref="elInput4"
									@input="handleInputChange($event, 4)"
									@keyup.native.delete="handleInputDelete(aimAddress.ip4, 4)"
									size="mini"
									@blur="handleIpAimAddressBlur"></el-input>
				<div class="aim-ip-error-wrap">
					<transition name="slide-fade">
						<div v-if="isIpCheck" class="aim-ip-error-text">{{ipText}}</div>
					</transition>
				</div>
			</div>
			<span style="display: inline-block;width: 10px;text-align: center;color: #999999"> / </span>
			<div class="aim-address-right-item">
				<el-input v-model="aimAddress.code"
									:class="{'error': isCodeCheck}"
									class="aim-wrap-input-right"
									size="small"
									:placeholder="placeholder"
									@input="handleCodeAimAddressBlur"
									@blur="handleCodeAimAddressBlur"></el-input>
				<div class="aim-ip-error-wrap">
					<transition name="slide-fade">
						<div v-if="isCodeCheck" class="aim-ip-error-text">{{keyCodeText}}</div>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';

	/* 匹配子网掩码 */
	let getCode: any = {
		0: '0',
		1: '128.0.0.0',
		2: '192.0.0.0',
		3: '224.0.0.0',
		4: '240.0.0.0',
		5: '248.0.0.0',
		6: '252.0.0.0',
		7: '254.0.0.0',
		8: '255.0.0.0',
		9: '255.128.0.0',
		10: '255.192.0.0',
		11: '255.224.0.0',
		12: '255.240.0.0',
		13: '255.248.0.0',
		14: '255.252.0.0',
		15: '255.254.0.0',
		16: '255.255.0.0',
		17: '255.255.128.0',
		18: '255.255.192.0',
		19: '255.255.224.0',
		20: '255.255.240.0',
		21: '255.255.248.0',
		22: '255.255.252.0',
		23: '255.255.254.0',
		24: '255.255.255.0',
		25: '255.255.255.128',
		26: '255.255.255.192',
		27: '255.255.255.224',
		28: '255.255.255.240',
		29: '255.255.255.248',
		30: '255.255.255.252',
		31: '255.255.255.254',
		32: '255.255.255.255',
	};

	const isMatchCode = (num: number) => {
		return getCode[num];
	};
	@Component({
		name: 'AimAddress',
	})
	export default class AimAddress extends Vue {
		/**
		 * @size --
		 *        |- mini  最小不帶掩碼
		 *        |- small 小号带掩码输入
		 *        |- 默认 掩码独立 input
		 */
		@Prop({type: String, default: ''}) public placeholder!: string;
		@Prop({type: String, default: ''}) public defValue!: string;
		@Prop({type: String, default: ''}) public size!: string;


		private mini: any = {
			ip1: '',
			ip2: '',
			ip3: '',
			ip4: '',
		};

		/* 子网 */
		private aimAddress: any = {
			ip1: '',
			ip2: '',
			ip3: '',
			ip4: '',
			code: '',
		};

		/* ip data*/
		private isIpCheck: boolean = false;
		private ipText: string = '';
		private regex = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
		/* code data */
		private isCodeCheck: boolean = false;
		private keyCodeText: string = '';

		private isInit: string = 'start';

		@Watch('defValue')
		private handleDefValue(ovl: string) {
			if (ovl) {
				if (this.size == '' && this.aimAddress.code == '') {
					let arr = ovl.split('/');
					let ipList = arr[0].split('.');
					this.aimAddress = {
						ip1: ipList[0],
						ip2: ipList[1],
						ip3: ipList[2],
						ip4: ipList[3],
						code: arr[1],
					};
				} else if (this.size == 'mini' && this.mini.ip1 == '') {
					let ipList = ovl.split('.');
					this.mini = {
						ip1: ipList[0],
						ip2: ipList[1],
						ip3: ipList[2],
						ip4: ipList[3],
					};
				}
			}
		}

		@Emit('change')
		private handleChange() {
			let str: string = '';
			if (this.size == 'mini') {
				for (const mini in this.mini) {
					if (this.mini[mini] != '') {
						if (mini !== 'code' && mini !== 'ip4') {
							str += this.mini[mini] + '.';
						} else {
							str += this.mini[mini];
						}
					}
				}
			} else {
				for (const aimAddress in this.aimAddress) {
					if (this.aimAddress[aimAddress] != '') {
						if (aimAddress !== 'code' && aimAddress !== 'ip4') {
							str += this.aimAddress[aimAddress] + '.';
						} else if (aimAddress === 'code') {
							if (Object.keys(getCode).indexOf(this.aimAddress[aimAddress]) != -1) {
								str += `/${this.aimAddress[aimAddress]}`;
							} else {
								str += `/${this.aimAddress[aimAddress]}`;
							}
						} else {
							str += this.aimAddress[aimAddress];
						}
					}
				}
			}
			if (this.size == 'mini') {
				return {type: 'mini', data: str, isVerify: !this.isIpCheck};
			} else {
				if (this.isIpCheck == false && this.isCodeCheck == false) {
					return {type: 'default', data: str, isVerify: true};
				} else {
					return {type: 'default', data: str, isVerify: false};
				}
			}
		}

		private ipErrorText(str: string): any {
			if (str == '') {
				return 'IPv4地址参数不能为空';
			} else {
				return 'IPv4地址格式错误';
			}
		}

		private keyCodeErrorText(str: string): any {
			if (str == '') {
				return '子网掩码或掩码位不能为空(IPv4)';
			} else if (Number(str) > 32) {
				return '掩码位范围为0-32(IPv4)';
			} else if (Number(str.length) > 2) {
				return '子网掩码或掩码位格式错误(IPv4)';
			} else {
				return '子网掩码或掩码位格式错误(IPv4)';
			}
		}

		/* 验证ip输入 */
		private handleCodeMiniBlur() {
			let str: string = '';
			for (const mini in this.mini) {
				if (this.mini[mini] != '') {
					if (mini !== 'code' && mini !== 'ip4') {
						str += this.mini[mini] + '.';
					} else {
						str += this.mini[mini];
					}
				}
			}

			this.isIpCheck = !this.regex.test(str);
			if (this.isIpCheck) {
				this.ipText = this.ipErrorText(str);
			} else {
				this.isIpCheck = false;
			}

			this.handleChange();
		}

		/* aim address */
		private handleIpAimAddressBlur() {
			let str: string = '';
			for (const aimAddress in this.aimAddress) {
				if (this.aimAddress[aimAddress] != '') {
					if (aimAddress !== 'code' && aimAddress !== 'ip4') {
						str += this.aimAddress[aimAddress] + '.';
					} else if (aimAddress !== 'code') {
						str += this.aimAddress[aimAddress];
					}
				}
			}
			this.isIpCheck = !this.regex.test(str);
			if (this.isIpCheck) {
				this.ipText = this.ipErrorText(str);
			}

			this.handleChange();
		}

		/* 掩码验证 */
		private handleCodeAimAddressBlur(e?: any) {
			let val = e ? e.target.value : '';
			console.log(val);
			if (val != '' && val.length <= 2) {
				this.isCodeCheck = isMatchCode(Number(val)) ? false : true;
				if (isMatchCode(Number(val))) {
					this.aimAddress.code = isMatchCode(Number(val));
				}
			} else {
				let isCheck = Object.values(getCode).includes(this.aimAddress.code);
				this.isCodeCheck = isCheck ? false : true;
			}

			this.keyCodeText = this.keyCodeErrorText(val);

			this.handleChange();
		}

		/* 重置 */
		private resetFiles() {
			this.isIpCheck = false;
			this.isCodeCheck = false;
			this.keyCodeText = '';
			this.aimAddress = {
				ip1: '',
				ip2: '',
				ip3: '',
				ip4: '',
				code: '',
			};
			this.mini = {
				ip1: '',
				ip2: '',
				ip3: '',
				ip4: '',
			};
		}

		private beforeDestroy(): void {
			console.log('卸载 aimAddress');
			this.resetFiles();
		}

		/* 子网ip输入时 */
		private handleInputChange(ev: any, num: number, org: any) {
			console.log(org);
			if (num == 1) {
				org.ip1 = ev.replace('.', '');
				this.isInit = 'start';
				if (ev.length == 3 && this.isInit == 'start') {
					(this.$refs.elInput2 as HTMLInputElement).focus();
					return false;
				}
			} else if (num == 2) {
				org.ip2 = ev.replace('.', '');
				this.isInit = 'start';
				if (ev.length == 3 && this.isInit == 'start') {
					(this.$refs.elInput3 as HTMLInputElement).focus();
					return false;
				}
			} else if (num == 3) {
				org.ip3 = ev.replace('.', '');
				this.isInit = 'start';
				if (ev.length == 3 && this.isInit == 'start') {
					(this.$refs.elInput4 as HTMLInputElement).focus();
					return false;
				}
			}



			this.handleIpAimAddressBlur();
		}

		/* 子网ip删除时 */
		private handleInputDelete(ev: any, num: number) {
			if (num == 4) {
				this.isInit = 'end';
				if (ev.length == 0 && this.isInit == 'end') {
					(this.$refs.elInput3 as HTMLInputElement).focus();
					return false;
				}
			} else if (num == 3) {
				this.isInit = 'end';
				if (ev.length == 0 && this.isInit == 'end') {
					(this.$refs.elInput2 as HTMLInputElement).focus();
					return false;
				}
			} else if (num == 2) {
				this.isInit = 'end';
				if (ev.length == 0 && this.isInit == 'end') {
					(this.$refs.elInput1 as HTMLInputElement).focus();
					return false;
				}
			}

			this.handleIpAimAddressBlur();
		}

		/* 键盘按下. 时*/
		private handleKeyDown(ev: any, num: number) {
			if (ev.code == 'Period') {
				if (num == 1) {
					this.isInit = 'start';
					if (this.isInit == 'start') {
						(this.$refs.elInput2 as HTMLInputElement).focus();
						return false;
					}
				} else if (num == 2) {
					this.isInit = 'start';
					if (this.isInit == 'start') {
						(this.$refs.elInput3 as HTMLInputElement).focus();
						return false;
					}
				} else if (num == 3) {
					this.isInit = 'start';
					if (this.isInit == 'start') {
						(this.$refs.elInput4 as HTMLInputElement).focus();
						return false;
					}
				}
			}
		}

		private verify(size: string) {
			if (size == 'mini') {
				this.handleCodeMiniBlur();
			} else if (size == 'ip') {
				this.handleIpAimAddressBlur();
			} else if (size == 'code') {
				this.handleCodeAimAddressBlur();
			} else {
				this.handleIpAimAddressBlur();
				this.handleCodeAimAddressBlur();
			}
		}
	}
</script>

