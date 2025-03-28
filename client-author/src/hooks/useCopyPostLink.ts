import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useCopyPostLink() {
  const { mutate: copyLink, isPending: isLoading } = useMutation({
    mutationFn: async (postId: string) => {
      const shareUrl = `${window.location.origin}/post/${postId}`;
      await navigator.clipboard.writeText(shareUrl);
    },
    onSuccess: () => {
      toast.success("Copied link");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { copyLink, isLoading };
}

export default useCopyPostLink;
