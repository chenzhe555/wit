#!/bin/bash
# properties
# 步骤数
steps=4

# IDE 端口文件
currentPath=`pwd`
currentPathArr=(`echo $currentPath | tr '/' ' '` )
idePortFile='/'${currentPathArr[0]}'/'${currentPathArr[1]}'/Library/Application Support/微信开发者工具/Default/.ide'


# steps
#echo "1/"$steps": 获取IDE端口号"
port=$(cat "$idePortFile")

#echo "2/"$steps": 替换路径标识"
replacePath="$(echo "${currentPath}" | sed 's/\//%2F/g' )"

#echo "3/"$steps": 拼接http地址"
curlHttpPath='http://127.0.0.1:'$port'/buildnpm?projectpath='$replacePath'&compiletype=miniprogram'

#echo "4/"$steps": 拼接http地址"
curl -s $curlHttpPath &> mp_npm_temp.txt
warnings=`cat mp_npm_temp.txt | jq '.warnings'`
rm -rf mp_npm_temp.txt
if [ "$warnings" != "[]" ];then
# 除了[].目前认为都是失败
echo 'npm构建失败，请检查后重试！可能原因：1.未打开微信开发者工具IDE 2.设置->安全端口未开启'
exit 1
fi
echo 'npm构建完成'