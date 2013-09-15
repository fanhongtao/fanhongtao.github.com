#!/bin/bash
# This file is in PUBLIC DOMAIN. You can use it freely. No guarantee.
#
# This file is prepare Maven enviroment after install Maven.
# @author Fan Hongtao <fanhongtao@gmail.com>

function exec() {
    echo
    echo "Exec: ##### $*"
    $*
}

old_path=`pwd`

exec mkdir maven
exec cd maven

# Execute common Maven commands
exec mvn archetype:generate -B -DarchetypeArtifactId=maven-archetype-quickstart -DgroupId=org.fanhongtao -DartifactId=test1 -Dversion=1.0-SNAPSHOT
exec cd test1
exec mvn help:describe -Dplugin=archetype

exec mvn dependency:analyze
exec mvn dependency:copy-dependencies 
exec mvn dependency:go-offline
exec mvn dependency:list

exec mvn help:help
exec mvn help:describe -Dplugin=archetype -Ddetail

exec mvn test
exec mvn javadoc:jar
exec mvn source:jar
exec mvn install

# Download jars, and their sources,  used by daily work
exec cd ../
exec mkdir default
exec cd default
curl https://raw.github.com/fanhongtao/fanhongtao.github.com/master/attachments/default_pom.xml > pom.xml
exec mvn dependency:sources

# return 
exec cd "$old_path"
exec rm -rf maven
