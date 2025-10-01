import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, TrendingUp } from "lucide-react";

export default function MyStokvelContributions({ stokvels, currentUser }) {
  const totalContributions = stokvels.reduce((sum, s) => sum + (s.contribution_amount || 0), 0);
  const totalPooled = stokvels.reduce((sum, s) => sum + (s.total_pool || 0), 0);

  return (
    <Card className="glass-effect shadow-lg border-0 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-500" />
          My Stokvel Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Active Groups</p>
              <p className="text-xl font-bold text-purple-600">{stokvels.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Monthly Contributions</p>
              <p className="text-xl font-bold text-blue-600">R{totalContributions.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Pooled</p>
              <p className="text-xl font-bold text-emerald-600">R{totalPooled.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stokvels.map(stokvel => (
            <div key={stokvel.id} className="p-4 bg-slate-50/50 rounded-lg border border-slate-200">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-slate-800">{stokvel.name}</h4>
                <Badge variant="outline" className="text-xs">
                  {stokvel.status}
                </Badge>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Your contribution:</span>
                  <span className="font-medium">R{stokvel.contribution_amount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Members:</span>
                  <span className="font-medium">{stokvel.current_members}/{stokvel.max_members}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}