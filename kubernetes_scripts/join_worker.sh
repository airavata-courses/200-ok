# Join command is static and is tightly coupled with the master/network
# You need to update the join command in case you create a new master/network.
kubeadm join 10.1.1.3:6443 --token ox7zql.86w739j2oxwsrzwm     --discovery-token-ca-cert-hash sha256:65bd30e301e4009e60aee64207f5a63118f42f9326a4631a9948440c29d8fa6f
