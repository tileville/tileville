# DIRECTORY='framework1'
# DEP_DIRECTORY='protokit-framework1'

# PATCH_CONTENT="
# export function equalProvable(received, expected) {
#     expect(received).toHaveLength(expected.length);
#     const receivedBigInts = received.map((f) => f.toBigInt());
#     const expectedBigInts = expected.map((f) => f.toBigInt());
#     const pass = receivedBigInts.every((v, index) => v === expectedBigInts[index]);
#     return {
#         message: () => \`Expected ${expectedBigInts}, received ${receivedBigInts}\`,
#         pass,
#     };
# }
# "

# if [ -d "$DEP_DIRECTORY" ]; then
#   echo "$DEP_DIRECTORY does exist."
#   pwd
#   ls
#   ls "$DEP_DIRECTORY"
#   ls "$DEP_DIRECTORY/framework"
#   ls "$DEP_DIRECTORY/framework/packages"
#   ls "$DEP_DIRECTORY/framework/packages/common"

#   exit 0
# fi

# rm -rf "$DIRECTORY"

# mkdir -p "$DIRECTORY"
# mkdir -p "$DEP_DIRECTORY"

# git clone https://github.com/proto-kit/framework "$DIRECTORY"

# cd "$DIRECTORY" && git checkout 8a8619e6cf2d24dc3cc2540654fd944b6c3966cb && git merge b881184d613f17928c8bbc94664634feff388c64 -m "Merge" && git remote add protokit-zknoid https://github.com/ZkNoid/proto-kit && git fetch protokit-zknoid shim-connection-fix-1-1-0 && git merge protokit-zknoid/shim-connection-fix-1-1-0 -m "Merge" && npm install && npm run build && echo "$PATCH_CONTENT" >"packages/common/dist/test/equalProvable.js" && cd ../

# mv "$DIRECTORY" "$DEP_DIRECTORY"

echo "Fetching git submodule"
git submodule update --init --recursive
echo "Submodule fetched successfully"
cd proto-kit && npm i && npm build
echo "#### Protokit dependencies prepared successfully 🔥 ###"
echo "going back to main directory"
cd ..
