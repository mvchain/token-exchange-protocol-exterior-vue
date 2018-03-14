<template>
  <el-upload
    class="avatar-uploader"
    :data="imgObj"
    :action="imgBase"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :on-error="handleAvatarError"
    :before-upload="beforeAvatarUpload">
    <img :src="imageUrl?imageUrl:defUrl" class="avatar">
  </el-upload>
</template>
<script type='text/ecmascript-6'>
  import {ossload} from '../services';
  import def from '../assets/img/avatar.png';
  import urlAO from '@/utils/config';
  export default {
    name: 'ossload',
    data() {
      return {
        defUrl: def,
        imgName: '',
        imageUrl: JSON.parse(window.sessionStorage.getItem('userInfo')).headIconUrl,
        imgBase: urlAO.urlsVar.photoUrl,
        ossObj: {},
        imgObj: {
          name: '',
          key: '',
          policy: '',
          OSSAccessKeyId: '',
          success_action_status: '200',
          signature: ''
        }
      };
    },
    mounted: function () {
      ossload().then((res) => {
        this.ossObj = JSON.parse(res);
        this.imgObj.OSSAccessKeyId = this.ossObj.accessid;
        this.imgObj.policy = this.ossObj.policy;
        this.imgObj.signature = this.ossObj.signature;
      }).catch((err) => {
        this.$message.error(err);
      });
    },
    methods: {
      random_string(len) {
        len = len || 32;
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        let maxPos = chars.length;
        let pwd = '';
        for (let i = 0; i < len; i++) {
          pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
      },
      dateFormat(date, format) {
        let o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds(),
          'q+': Math.floor((date.getMonth() + 3) / 3),
          'S': date.getMilliseconds()
        };

        if (/(y+)/.test(format)) {
          format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
          if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
          }
        }
        return format;
      },
      get_suffix(filename) {
        let pos = filename.lastIndexOf('.');
        let suffix = '';
        if (pos !== -1) {
          suffix = filename.substring(pos);
        }
        return suffix;
      },
      calculate_object_name(filename) {
        let now = new Date();
        let nowStr = this.dateFormat(now, 'yyyyMMddhhmmss');
        let suffix = this.get_suffix(filename);
        return this.ossObj.dir + nowStr + this.random_string(10) + suffix;
      },

      handleAvatarSuccess(res, file) {
        this.imageUrl = this.imgBase + '/' + this.imgObj.key;
        this.$emit('set-img-url', this.imageUrl);
      },
      beforeAvatarUpload(file) {
        let isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        let isLt2M = file.size / 1024 / 1024 < 1;
        this.imgObj.key = this.calculate_object_name(file.name);
        if (!isJPG) {
          this.$message.error('上传头像图片只支持jpg、png、jpeg格式图片!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        if (this.imgName === file.name) {
          this.$message.error('请勿重复上传');
          return false;
        } else {
          this.imgName = file.name;
        }
        return isJPG && isLt2M;
      },
      handleAvatarError(err) {
        this.$message.error(err);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>
