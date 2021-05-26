if [ "$1" != "" ]; then
    echo "Module is $1"   
    nest g module "$1"
    nest g controller "$1" --no-spec
    nest g service "$1" --no-spec
else
    echo "Module is is empty"
fi