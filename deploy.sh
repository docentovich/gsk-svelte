server="root@vm655661.vps.masterhost.tech"
gsk="/var/www/gsk-wp"
destiny="$gsk/app/front"
src="."

npm run build
ssh "$server" "cd $gsk && git reset --hard && git pull"
zip -r -q arch.zip __sapper__ node_modules package.jso static
scp -r "$src/arch.zip" "$server:/tmp/gsk/arch.zip"
ssh "$server" "unzip -o -qq /tmp/gsk/arch.zip -d $destiny/public &&
              chown -R www-data /var/www/gsk-wp &&
              docker-compose -f $gsk/prod-with-node/docker-compose.yml down &&
              docker-compose -f $gsk/prod-with-node/docker-compose.yml up -d"
sleep 2m
