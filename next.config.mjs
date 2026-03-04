/** @type {import('next').NextConfig} */
import fs from "node:fs"

const isGitHubActions = process.env.GITHUB_ACTIONS === "true"
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? ""
const isUserSite = repo.endsWith(".github.io")
const hasCustomDomain = fs.existsSync("public/CNAME")
const useBasePath = isGitHubActions && !isUserSite && !hasCustomDomain
const basePath = useBasePath ? `/${repo}` : ""

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
