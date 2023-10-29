# set manually
export DCMS=/Users/vladislavkozulin/work/dcms


# private paths
export DCMS_SCRIPTS=$DCMS/scripts
export DCSM_ADMIN_PANEL=$DCMS/admin-panel
export DCSM_SERVER=$DCMS/server
export DCSM_WEB=$DCMS/web
export DCSM_DIGITAL_SINAGE=$DCMS/digital-sinage
export DCSM_INFRA=$DCMS/infra

export PATH=$PATH:$DCMS_SCRIPTS

# webos sdk
export LG_WEBOS_TV_SDK_HOME="$DCSM_DIGITAL_SINAGE/lib/webOS_TV_SDK"

if [ ! -d "$LG_WEBOS_TV_SDK_HOME/CLI/bin" ]; then
  echo install webos Cli https://webostv.developer.lge.com/develop/tools/cli-installation into $LG_WEBOS_TV_SDK_HOME/CLI
else
    # Setting the WEBOS_CLI_TV variable to the bin directory of CLI
    export WEBOS_CLI_TV="$LG_WEBOS_TV_SDK_HOME/CLI/bin"
    # Adding the bin directory of CLI to the PATH variable
    export PATH="$PATH:$WEBOS_CLI_TV"
fi;


if [ ! -d "$LG_WEBOS_TV_SDK_HOME/Simulator/" ]; then
  echo install webos Simulator https://webostv.developer.lge.com/develop/tools/simulator-installation into $LG_WEBOS_TV_SDK_HOME/Simulator
else

fi;

source $DCSM_INFRA/init.sh
