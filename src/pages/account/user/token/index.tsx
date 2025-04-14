import { useRequireAuth } from '@/hooks/useRequireAuth'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import CreateToken from './Create'

const tokens: [] = []

function TokenPage() {
  useRequireAuth()
  return (
    <section className="w-full h-full py-6">
      <section className="w-full max-w-screen-2xl mx-auto">
        <div className="w-full flex justify-between gap-4 mb-4">
          <CreateToken />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Token</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Expires at</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.length > 0 ? (
              <>Tokens</>
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No tokens found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </section>
  )
}

export default TokenPage
