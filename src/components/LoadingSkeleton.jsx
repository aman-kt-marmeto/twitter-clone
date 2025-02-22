export default function LoadingSkeleton() {
    return (
        <div className="post-item main-container-padding border-main-items ajc-top-bn">
            <div className="skeleton-post">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-content">
                    <div className="skeleton-text"></div>
                    <div className="skeleton-text image-skeleton"></div>
                    <div className="skeleton-text-short"></div>
                </div>
            </div>
        </div>
    );
}