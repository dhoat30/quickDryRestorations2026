import Image from "next/image";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="loading-wrapper">
        <Image src="/quickdry/logo.png" width={187}
                height={100} alt="QuickDry Restorations" quality="60" priority />
        <div className="loader"></div>
    </div>
}
/* HTML: <div class="loader"></div> */
