---
layout: post
title: 在三星9100上使用Android 4.1.1
description:  修复Android4.1.1 ROM无法使用Eclipse上传APK包的BUG。
categories: programming
tags: [android]
copyright: cn
---

从[电玩巴士](http://www.tgbus.com/)上找到三星i9100的[4.1.1 ROM](http://samsung.tgbus.com/201209/448773.shtml)。

按照该文下载、刷机，一切看起来都很正常。

但是在使用Eclipse上传APK时，系统提示“Permission denied”错误，报类似如下的日志：
<pre>
D/AndroidRuntime(12509): Calling main entry com.android.commands.pm.Pm
W/zipro   (11886): Unable to open zip '/data/local/tmp/XposedInstaller.apk': Permission denied
D/asset   (11886): failed to open Zip archive '/data/local/tmp/XposedInstaller.apk'
W/PackageParser(11886): Unable to read AndroidManifest.xml of /data/local/tmp/XposedInstaller.apk
W/PackageParser(11886): java.io.FileNotFoundException: AndroidManifest.xml
W/PackageParser(11886):         at android.content.res.AssetManager.openXmlAssetNative(Native Method)
W/PackageParser(11886):         at android.content.res.AssetManager.openXmlBlockAsset(AssetManager.java:522)
W/PackageParser(11886):         at android.content.res.AssetManager.openXmlResourceParser(AssetManager.java:478)
W/PackageParser(11886):         at android.content.pm.PackageParser.parsePackageLite(PackageParser.java:749)
W/PackageParser(11886):         at com.android.defcontainer.DefaultContainerService$1.getMinimalPackageInfo(DefaultContainerService.java:169)
W/PackageParser(11886):         at com.android.internal.app.IMediaContainerService$Stub.onTransact(IMediaContainerService.java:110)
W/PackageParser(11886):         at android.os.Binder.execTransact(Binder.java:367)
W/PackageParser(11886):         at dalvik.system.NativeStart.run(Native Method)
W/DefContainer(11886): Failed to parse package
</pre>

Google一番之后，在xda developer找到了[解决问题的办法](http://forum.xda-developers.com/showthread.php?p=30873127)。

先创建一个名为 98adbpatch 的文件，文件内容为：
<pre>
#!/system/bin/sh
mount -o rw,remount /
mv /sbin/adbd.jb /sbin/adbd
</pre>

再将该文件通过 adb 命令上传到 SD卡上
<pre>
adb push 98adbpatch /sdcard
</pre>

然后通过ROM自带的 “R.E.管理器”，

* 找到 /sdcard/98adbpatch 文件，长按，在“选项”中选择“移动”
* 进入 /system/etc/init.d 目录，确保其挂载成“读写”状态（如果不是，右上方有一个“挂载读写”的小按钮），然后按左下方“粘贴”按钮。
* 参照原有的 90userinit 文件，修改 98adbpatch 的权限。（长按，在“选项”中选择“权限”）

最后，重启手机。

PS：9100手机只是测试机，这个ROM我只使用了Wifi，没有使用无线信号，所以并不清楚在无线环境下能否正常工作。
