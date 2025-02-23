"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { doc, setDoc } from "firebase/firestore"
import Swal from "sweetalert2"
import { firestore } from "../config/firebase"
import { useOrder } from "../context/OrderProvider"
import { useDelivery } from "../context/DeliveryProvider"
import useAuth from "../hooks/useAuth"
import { generateCustomId } from "../utils/generateCustomId"
import { generateReceipt } from "../utils/generateReceipt"
import { ArrowLeft, Package, User } from "lucide-react"
import CustomerForm from "../components/PlaceOrder/CustomerForm"

const PlaceOrder = () => {
  const { order, setOrder } = useOrder()
  const { input, disabled } = useDelivery()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState("summary") // 'summary' or 'customer'

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handlePlaceOrder = async () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to place your order",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signin")
        }
      })
      return
    }

    try {
      setIsProcessing(true)
      const customId = await generateCustomId()
      const orderData = {
        orderId: customId,
        userId: user.uid,
        items: order,
        customerDetails: input,
        totalAmount: calculateTotal(),
        status: "Pending",
        createdAt: new Date().toISOString(),
      }

      await setDoc(doc(firestore, "orders", customId), orderData)
      generateReceipt(orderData)
      setOrder([])

      Swal.fire({
        title: "Order Placed!",
        text: "Please collect your receipt to get your order from the counter",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/order-successful")
      })
    } catch (error) {
      console.error("Error placing order:", error)
      Swal.fire({
        title: "Error",
        text: "Failed to place order. Please try again.",
        icon: "error",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (order.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Package className="mx-auto h-12 w-12 text-red-600" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
          <p className="mt-1 text-sm text-gray-500">Start adding some delicious items to your order.</p>
          <div className="mt-6">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              View Menu
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-semibold text-red-600">THOMA RESTAURANT</h1>
          </div>

          <div className="bg-white shadow rounded-lg">
            {/* Progress Steps */}
            <div className="border-b border-gray-200">
              <div className="flex justify-around p-4">
                <button
                  onClick={() => setCurrentStep("summary")}
                  className={`flex items-center ${currentStep === "summary" ? "text-red-600" : "text-gray-500"}`}
                >
                  <Package className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Order Summary</span>
                </button>
                <button
                  onClick={() => setCurrentStep("customer")}
                  className={`flex items-center ${currentStep === "customer" ? "text-red-600" : "text-gray-500"}`}
                >
                  <User className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Customer Details</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              {currentStep === "summary" ? (
                // Order Summary View
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">Your Order</h2>
                    <div className="space-y-4">
                      {order.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <img
                            src={item.image || "/placeholder.svg?height=60&width=60"}
                            alt={item.title}
                            className="h-16 w-16 rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span className="text-base font-medium text-gray-900">Total</span>
                        <span className="text-base font-medium text-red-600">${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentStep("customer")}
                      className="w-full py-3 px-4 rounded-md text-white font-medium bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Continue to Customer Details
                    </button>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">Order Preview</h2>
                    <div className="rounded-md bg-gray-50 p-4 space-y-2">
                      {input.name && (
                        <p className="text-sm text-gray-600">
                          Name: <span className="font-medium text-gray-900">{input.name}</span>
                        </p>
                      )}
                      {input.phone && (
                        <p className="text-sm text-gray-600">
                          Phone: <span className="font-medium text-gray-900">{input.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // Customer Form View
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">Customer Details</h2>
                    <CustomerForm />

                    <div className="flex space-x-4">
                      <button
                        onClick={() => setCurrentStep("summary")}
                        className="flex-1 py-3 px-4 rounded-md text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Back to Summary
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={disabled || isProcessing}
                        className={`flex-1 py-3 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                          ${
                            disabled || isProcessing ? "bg-gray-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                          }`}
                      >
                        {isProcessing ? "Processing..." : "Place Order"}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                    <div className="rounded-md bg-gray-50 p-4">
                      <div className="space-y-2">
                        {order.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {item.title} x {item.quantity}
                            </span>
                            <span className="font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-900">Total</span>
                            <span className="font-medium text-red-600">${calculateTotal().toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder

