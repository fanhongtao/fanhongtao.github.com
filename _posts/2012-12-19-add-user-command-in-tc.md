---
layout: post
title: Total Commander中添加自定义命令
categories: tool
tags: [tool]
copyright: cn
---

下面以在TC 8.0创建一个用于打开 msysgit 的 Bash 窗口的命令为例进行说明。

除了添加自定义的命令之外，我还为该命令指定快捷键和按钮。

# 1. 创建一个自定义命令，并为其指定快捷键

第一步：在TC中，通过 "Configuration" -> "Options" ，打开选项对话框

第二步：选择左下方的 "Misc."

第三步：在 "Redefine hotkeys (keyboard remapping)" 下面，勾选 "Control +", 然后在下拉框中选择字母 "G" （即，快捷键是 Ctrl+G） 
 
第四步：在下方的 "Command:" 处，点击 "选择" 按钮（有点像放大镜的那个），进入命令选择界面。

第五步：在命令选择界面侧，选择最下方的 "usercmd.ini"

第六步：点击 "New" 按钮，输入 em_Bash ，点击 "OK"，进入命令创建对话框

第七步：在命令创建对话框中，填写以下值，

<table width="100%">
    <thead>
        <tr>
            <th width="20%">参数</th>
            <th width="80%">值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Command:</td>
            <td>cmd.exe</td>
        </tr>
        <tr>
            <td> Parameters: </td>
            <td> /c ""D:\Program Files\Git\bin\sh.exe" --login -i" </td>
        </tr>
        <tr>
            <td>Icon file:</td>
            <td>D:\Program Files\Git\etc\git.ico</td>
        </tr>
        <tr>
            <td>Tooltip:</td>
            <td>Bash</td>
        </tr>		
	</tbody>
</table>

然后点击 "OK" ，退到命令选择界面。此时新创建的 em_Bash 命令会被选中。

第八步：点击 "OK" ，退到 选项对话框

第九步：点击 "OK"。

# 2. 为自定义命令创建一个按钮

第一步：在TC中，将鼠标放到工具栏空白处，点击右键，选择 "Change"，进入修改工具栏的对话框

第二步：点击 "Add" 按钮，在 "Command:" 选择为 "em_Bash"，然后点击 "OK"


# 3. 相关文档

[Total Commander中添加工具栏按钮](/2012/02/24/add-button-in-tc.html)

