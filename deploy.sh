server="root@vm655661.vps.masterhost.tech"
destiny="/var/www/gsk-wp/app/front"
src="."

npm run build
zip arch.zip __sapper__ node_modules package.json
scp -r "$src/arch.zip" "$server:/tmp/gsk/arch.zip"
ssh "$server" "unzip /tmp/gsk/arch.zip -d $destiny/public"
