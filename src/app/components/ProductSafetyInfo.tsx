import React from 'react';
import { AlertTriangle, Shield, Droplet, Clock, FileText } from 'lucide-react';
import { Card } from './ui/card';

interface ProductSafetyInfoProps {
  category: string;
}

export const ProductSafetyInfo: React.FC<ProductSafetyInfoProps> = ({ category }) => {
  const isPesticide = category.toLowerCase() === 'pesticide';

  return (
    <div className="space-y-6">
      {/* Dosage Information */}
      <Card className="p-6 border-2 border-blue-200 bg-blue-50">
        <div className="flex gap-3 mb-4">
          <Droplet className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-lg text-blue-900 mb-3">
              खुराक जानकारी / Dosage Information
            </h3>
            <div className="space-y-3 text-blue-900">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-blue-200">
                      <th className="text-left py-2 font-semibold">Crop / फसल</th>
                      <th className="text-left py-2 font-semibold">Dosage / खुराक</th>
                      <th className="text-left py-2 font-semibold">Water / पानी</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-blue-100">
                      <td className="py-2">Cotton / कपास</td>
                      <td className="py-2">250-300 ml/acre</td>
                      <td className="py-2">200 लीटर</td>
                    </tr>
                    <tr className="border-b border-blue-100">
                      <td className="py-2">Paddy / धान</td>
                      <td className="py-2">300-350 ml/acre</td>
                      <td className="py-2">200 लीटर</td>
                    </tr>
                    <tr>
                      <td className="py-2">Vegetables / सब्जी</td>
                      <td className="py-2">200-250 ml/acre</td>
                      <td className="py-2">150-200 लीटर</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm italic">
                ⚠️ उपयोग से पहले लेबल पढ़ें / Read label before use
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Application Method */}
      <Card className="p-6 border-2 border-green-200 bg-green-50">
        <h3 className="font-bold text-lg text-green-900 mb-4">
          उपयोग विधि / Application Method
        </h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <p className="font-semibold text-green-900">तैयारी / Preparation</p>
              <p className="text-sm text-green-800">
                साफ पानी में सिफारिश की गई मात्रा मिलाएं
                <br />
                Mix recommended quantity in clean water
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <p className="font-semibold text-green-900">छिड़काव / Spraying</p>
              <p className="text-sm text-green-800">
                समान रूप से पत्तियों और तनों पर छिड़काव करें
                <br />
                Spray evenly on leaves and stems
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <div>
              <p className="font-semibold text-green-900">समय / Timing</p>
              <p className="text-sm text-green-800">
                सुबह या शाम को छिड़काव करें, तेज धूप में नहीं
                <br />
                Spray in morning or evening, not in strong sunlight
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Safety Precautions */}
      {isPesticide && (
        <Card className="p-6 border-2 border-red-200 bg-red-50">
          <div className="flex gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg text-red-900 mb-3">
                सुरक्षा सावधानियां / Safety Precautions
              </h3>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <ul className="space-y-3 text-red-900">
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold flex-shrink-0">⚠️</span>
                  <span>
                    <strong>सुरक्षा उपकरण पहनें / Wear Safety Equipment:</strong>
                    <br />
                    दस्ताने, मास्क, और सुरक्षात्मक कपड़े / Gloves, mask, and protective clothes
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold flex-shrink-0">⚠️</span>
                  <span>
                    <strong>बच्चों से दूर रखें / Keep Away from Children:</strong>
                    <br />
                    बच्चों और पालतू जानवरों की पहुंच से दूर रखें
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold flex-shrink-0">⚠️</span>
                  <span>
                    <strong>खाने-पीने से दूर / Keep Away from Food:</strong>
                    <br />
                    खाद्य पदार्थों और पशु चारे से दूर रखें
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold flex-shrink-0">⚠️</span>
                  <span>
                    <strong>उपयोग के बाद / After Use:</strong>
                    <br />
                    साबुन से अच्छी तरह हाथ-मुंह धोएं / Wash hands and face thoroughly with soap
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Harvest Waiting Period */}
      {isPesticide && (
        <Card className="p-6 border-2 border-yellow-200 bg-yellow-50">
          <div className="flex gap-3">
            <Clock className="h-6 w-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg text-yellow-900 mb-2">
                फसल कटाई अवधि / Harvest Waiting Period
              </h3>
              <p className="text-yellow-900">
                छिड़काव के बाद <strong>7-15 दिन</strong> तक फसल न काटें
                <br />
                Do not harvest for <strong>7-15 days</strong> after spraying
              </p>
              <p className="text-sm text-yellow-800 mt-2 italic">
                ⚠️ विशिष्ट अवधि के लिए उत्पाद लेबल देखें / Check product label for specific period
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Government Approval */}
      <Card className="p-6 border-2 border-purple-200 bg-purple-50">
        <div className="flex gap-3">
          <Shield className="h-6 w-6 text-purple-600 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-lg text-purple-900 mb-2">
              सरकारी अनुमोदन / Government Approval
            </h3>
            <p className="text-purple-900">
              यह उत्पाद CIB & RC (केंद्रीय कीटनाशक बोर्ड) द्वारा अनुमोदित है
              <br />
              This product is approved by CIB & RC (Central Insecticides Board)
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm text-purple-800">
              <FileText className="h-4 w-4" />
              <span>Product label available for download</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

